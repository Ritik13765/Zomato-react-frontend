// import React,  { useState, useEffect }  from 'react'
// import axios from 'axios';
// import "./ViewFood.css";
// import { useNavigate, useParams } from 'react-router-dom';

// const ViewFood = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const[restaurant,setRestaurant]= useState({});
//     const[product,Setproduct]= useState([]);
//     // const [totalPrice, setTotalPrice] = useState(0);
//     // const [cart, setCart] = useState([]);


//     useEffect(() => {
//         async function showProduct() {
//             const restaurantResponse = await axios.get(`http://localhost:7000/api/restro/${id}`);
//             console.log(restaurantResponse.data,"rrrr")
//             setRestaurant(restaurantResponse.data);

//             const productResponse = await axios.get('http://localhost:7000/api/product');
//             const filteredProducts = productResponse.data.filter(p => p.restaurant === id);
//             console.log(productResponse.data,"ererer");

//             Setproduct(filteredProducts);
//         }
    
//         showProduct();
//       }, []);

//       const addProductToCart=(id)=>{
//         let updateproduct=[...product]
//         updateproduct[id].quantity = ((updateproduct[id].quantity || 0) + 1);;
//         Setproduct(updateproduct);

//         const handleplus = (id) => {
//           let updatedproduct = [...product];
//           updateproduct[id].quantity = ((updateproduct[id].quantity || 0) + 1);
//           Setproduct(updateproduct);
//       }

//       const addProduct = () => {
//         navigate(`/view/${id}/addproduct`);
//       };
//       const viewCart = () => {
//         navigate(`/viewCart/${id}`, { state: { cart, totalPrice, restaurant } });
//       };


//   return (
//     <div>
//         <div id='parent' className=' '>
//         <div className='button_cart mb-5'>
//           <button onClick={addProduct}> add product</button>
//           <button onClick={viewCart}> View cart</button>
//         </div>
//         <div>
//         <img id='restroImage' src={restaurant.image} alt='Restaurant' />
//           <h4>{restaurant.name}</h4>
//         </div>
//         <div className='product-card-conatiner'></div>
//           product.map((res,id)=>{
//             return(
//               <section className='secondcontainerview'>
//               <div className='secondcontainer'>
//               <div>  <img className='secondcardimage' src={res.image} alt=''/> </div>
//               {/* <div className='secondcard-body'> */}
//                <div className="list-2-item"> <h1>{res.name}</h1> </div>
//                <div className="list-2-item">  <h3>{res.descriptions}</h3> </div>
//                <div className="list-2-item"> <h2>{res.price}</h2> </div>
//                <div> <h4> ${res.price}</h4></div>

//                <div>
//                 <div>Quantity:{res.quantity || 0}</div>
//                 { !res.quantity ? (
//                 <button onClick={()=>addProductToCart(id)}>Add</button>
//                 ) : (
//                   <>
//                    <button onClick={() => handleplus(id)}>+</button>
//                     <button onClick={() => handleminus(id)}>-</button>
//                   </>
//                 )
//               }
//                </div>

//                </div>
//                 {/* </div> */}
//                 </section>
//             )
//           })
        
//     </div>
//     </div>
//   )
// }
// }

// export default ViewFood














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewFood.css'
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Viewfood = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product,Setproduct]=useState([]);
  const zomatologo = "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png";

   useEffect(()=>{
    async function showProduct(){
      const restaurantResponse = await axios.get(`http://localhost:7000/api/restro/${id}`);
      console.log(restaurantResponse.data,"rrrr");
          setRestaurant(restaurantResponse.data);

          const productResponse = await axios.get('http://localhost:7000/api/product');
          // const productResponse = await axios.get('http://localhost:4000/api/product');
        const filteredProducts = productResponse.data.filter(p => p.restaurant === id);
          console.log(productResponse.data,"resss");

          Setproduct(filteredProducts);
    }
    showProduct()

   },[])

   const addproductToCart=(id)=>{
    let updatedproduct=[...product]
    updatedproduct[id].quantity=((updatedproduct[id].quantity || 0)+1)
    Setproduct(updatedproduct)

    const productToAdd = { ...product[id]};
    setCart([...cart, productToAdd]);
    calculateTotalPrice();
   }

   const handleplus=(id)=>{
    let updatedproduct = [...product];
    updatedproduct[id].quantity = ((updatedproduct[id].quantity || 0) + 1);
    Setproduct(updatedproduct);

    const productToAdd = { ...product[id] };
    setCart([...cart.filter(item => item._id !== productToAdd._id), productToAdd]);
    calculateTotalPrice();
   };

   const handleminus=(id)=>{
    let updatedproduct = [...product];
    updatedproduct[id].quantity = Math.max(((updatedproduct[id].quantity || 0) - 1), 0);
    Setproduct(updatedproduct);

    const productToRemove = { ...product[id] };
    setCart(cart.filter(item => item._id !== productToRemove._id));
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const totalPrice = product.reduce((acc, curr) => {
      return acc + (curr.price || 0) * (curr.quantity || 0);
    }, 0);
    setTotalPrice(totalPrice);
  };


  const addProduct = () => {
    navigate(`/view/${id}/addproduct`);
  };
  const viewcart =()=>{
    navigate(`/view/${id}/viewcart` , { state: { cart, totalPrice, restaurant }});
  }


  return (
   <div id='parent' className='grandparents'>
      <div className='maincontaine'>
        <div className='imgelogo'><img src={zomatologo} alt="" /></div>
            <div className='immageserachbox'>
              <LocationOnIcon id='locationicon'/>
                <select  className='option34'>
                    <option >Bhopal</option>
                    <option >jhansi</option>
                    <option >Indor</option>
                    <option >Delhi</option>
                    <option >Lucknow</option>
                </select>
                <MoreVertIcon id='lineicon'/>
               <SearchIcon id='searchicon'/>  <input    id='fieldss' name='data'  type="text" placeholder="Search"/>
             </div>
             <div className='lohin'>Login</div>
             <div className='singhin'>Singin</div>
      </div>
         <div className='button_cart'>
            <div id='vbutton'> <button onClick={addProduct}> Add product</button></div>
            <div id='vbutton' > <button onClick={viewcart}>View cart ({cart.length})</button></div>
         </div>
            <div className='resturant-product-conatiner'>
                 <div className='resturantconatinerd'>
                    <div><h2 id='rheading'> Restaurant Name:- {restaurant.name}</h2></div>
                   <div><img id='restroImaged' src={restaurant.image} alt='Restaurant' /></div>
               </div>
            <div className='product-card-conatiner'>{
            product.map((res,id)=>{
              return(

               <div className='product-card'>
                <div><img id='prodimage' src={res.image} alt="" /></div>
                <div> <h3 id='pname'>{res.name}</h3></div>
                <div><h5 id='pdescriptions'>{res.descriptions}</h5></div>
                <div> <h5 id='pprice'>$ {res.price}</h5></div>
                <div>
                <div id='quantiy'>Quantity:{res.quantity || 0}</div>
                <div id='priceh'>Totel Price:{res.price*(res.quantity ||0)}</div>
                  { !res.quantity ?(
                    <button id='addplusminis' onClick={()=>addproductToCart(id)}  >Add</button>
                  ):(
                    <>
                     <button id='plusbutton' onClick={() => handleplus(id)}>+</button>
                    <button id='minusbutton' onClick={() => handleminus(id)}>-</button>
                    </>
                 ) }
                </div>

               </div>
)})}
 </div>
  </div>
 </div>
  )
}

export default Viewfood