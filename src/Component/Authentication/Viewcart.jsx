import React, { useState } from 'react'
import { useLocation,useParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import './Viewcart.css'


const BillDetailsCard = ({ totalPrice, discount, gstRate, platformChargeRate }) => {
  const gstAmount = (totalPrice * gstRate) / 100;
  const platformCharge = (totalPrice * platformChargeRate) / 100;
  const totalAmount = totalPrice - (totalPrice * discount) / 100 + gstAmount + platformCharge;



  return (
    <div className='bill-details-card'>
      <h3>Bill Details</h3>
      <p>Total Price: {totalPrice}</p>
      <p>Discount: {discount}%</p>
      <p>GST ({gstRate}%): {gstAmount}</p>
      <p>Platform Charge ({platformChargeRate}%): {platformCharge}</p>
      <p>Total Amount: {totalAmount}</p>
    </div>
  );
};



const Viewcart = () => {

  const location = useLocation();
   let {id}=    useParams()

  const { cart, totalPrice: initialTotalPrice ,restaurant} = location.state;
  console.log(restaurant,"reeeee");

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [cartItems, setCartItems] = useState(cart);



  const handlePayment = async () => {
    const stripe = await loadStripe("pk_test_51P4JfcSCrfbgdBvKAaNba63J7UQfnCNmk5YLik4FoOxnRwF3YiTeNDmr5uH8MFnSL1dOIuF6zR9JCqG7RKAndqLN00zVqglzBu");

    // console.log(body)
    const body = {
      products:cartItems,
        restroId:id,
        restaurant:restaurant
    }

    const headers = {
      "Content-Type":"application/json"
    }

    const response = await fetch("http://localhost:7000/api/payment",{
      method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
  });

  if(result.error){
    console.log(result.error, 'errrrr');
}

  }


  const handlePlus = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };


  const handleMinus = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = Math.max(updatedCartItems[index].quantity - 1, 0);
    setCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  const updateTotalPrice = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

const handleCouponChange = (e) => {
  setCoupon(e.target.value);
};

const handleApplyCoupon = () => {
  switch (coupon) {
    case 'MainbahutGareebhu':
      setDiscount(90);
      setSavedAmount((totalPrice * 90) / 100);
      break;

      case 'COUPON1':
        setDiscount(50);
        setSavedAmount((totalPrice * 50) / 100);
        break;

        case 'COUPON2':
          setDiscount(25);
          setSavedAmount((totalPrice * 25) / 100);
          break;
          default:
            alert('Invalid coupon code');
  }
};

  return (
    <div className='main-box'>
       <div className='topper'> <h1>Cart</h1> </div>
       {cartItems.length === 0 ? (
       <> <p>Your cart is empty</p></>
       ) :(
        <div>
          <>
            {cartItems.map((item, index) => (
              <div className='items-part' key={index}>
                <div>{item.name}</div>
                
                <div className='flex-direction'>
                <div className='quantitybtn'>
               <span> <button id='plusbtn' onClick={() => handlePlus(index)}>+</button> </span>
               <span id='matra'>{item.quantity} </span>
               <span>  <button id='minusbtn' onClick={() => handleMinus(index)}>-</button> </span>
               </div>
               <div>${item.price * item.quantity}</div>
               </div>
              </div>
            ))}
          
          </>
          <div className='coupons'>
            <div><h4>Apply Coupon</h4></div>
            <div>
              <select value={coupon} onChange={handleCouponChange}>
                <option value="">Select Coupon</option>
                <option value="MainbahutGareebhu">MainbahutGareebhu - 90% off</option>
                <option value="COUPON1">COUPON1 - 50% off</option>
                <option value="COUPON2">COUPON2 - 25% off</option>
              </select>
              <button id='aplycoupon' onClick={handleApplyCoupon}>Apply Coupon</button>
            </div>

            <button id='pay' onClick={handlePayment}>Pay Now</button>

            <BillDetailsCard
            totalPrice={totalPrice}
            discount={discount}
            gstRate={12}
            platformChargeRate={1}
            />
          </div>
       </div>
       )}
    </div>
    
  )
}

export default Viewcart