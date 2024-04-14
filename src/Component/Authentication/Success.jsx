import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Success.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Success = () => {
  const [order, setOrder] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get('http://localhost:7000/api/past-orders');
        setOrder(response.data);

        const initialRatings = response.data.map((order) => {
          const productsRatings = {};
          order.products.forEach((product) => {
            productsRatings[product._id] = { rating: 0, productId: product._id };
          });
          return {
            orderId: order.order._id,
            productsRatings,
          };
        });
        setRatings(initialRatings);
      } catch (error) {
        console.error('Error fetching past orders:', error);
      }
    }
    fetchOrder();
  }, []);

  const renderStars = (orderId, productId) => {
    const orderRatings = ratings.find((rating) => rating.orderId === orderId);
    if (!orderRatings) return null;

    const { rating } = orderRatings.productsRatings[productId] || { rating: 0 };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? 'gold' : 'grey'}
          onClick={() => handleRating(orderId, productId, i)} // Passing the correct rating value
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return stars;
  };

  const handleRating = async (orderId, productId, newRating) => {
    try {
      // Update the rating in the local state
      const updatedRatings = ratings.map((orderRating) => {
        if (orderRating.orderId === orderId) {
          orderRating.productsRatings[productId].rating = newRating;
        }
        return orderRating;
      });
      setRatings(updatedRatings);

      // Send the rating to the server
      const response = await axios.post('http://localhost:7000/api/ratings', { orderId, productId, rating: newRating });
      console.log('Rating saved:', response.data);
    } catch (error) {
      console.error('Error saving rating:', error);
      // Handle error, maybe show a notification to the user
    }
  };

  return (
    <div className='mainpastorder-container'>
    <div className='pastheading'><h1 id="hedinghs">Your previous order</h1></div>  
    <div className='pastorder-detail'>
      {order.map((res) => (
        <div className="resturnatsdetailk">
          <div className="reestu45">
            <p>OrderId: {res.order._id}</p>
            <p>Restaurant Name: {res.restaurant.name}</p>
            <p>Restaurant Address: {res.restaurant.address}</p>
            <p>Order Status: {res.order.status}</p>
          </div>
          {res.products.map((product) => (
            <div  className='product_past' key={product._id}>
              <div className='propast1'>Product Name: {product.name}</div>
              <div  className='propast2' >Price: <CurrencyRupeeIcon id='Currency'/> {product.price}</div>
              <div className='propast3'>Rating: {renderStars(res.order._id, product._id)}</div>
              <div className='pastimage'><img src={product.image} alt="" style={{ width: '150px', height: '130px' }} /></div>
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Success;
