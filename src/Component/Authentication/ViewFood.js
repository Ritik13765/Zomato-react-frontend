import React,  { useState, useEffect }  from 'react'
import axios from 'axios';
import "./ViewFood.css";
import { useNavigate, useParams } from 'react-router-dom';

const ViewFood = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const[restaurant,setRestaurant]= useState({});


    useEffect(() => {
        async function showProduct() {
            const restaurantResponse = await axios.get(`http://localhost:7000/api/restro/${id}`);
            console.log(restaurantResponse.data,"rrrr")
            setRestaurant(restaurantResponse.data);
        }
    
        showProduct();
      }, []);

      const addProduct = () => {
        navigate(`/view/${id}/addproduct`);
      };

  return (
    <div>
        <div id='parent' className=' '>
        <div className='button_cart mb-5'>
          <button onClick={addProduct}> add product</button>
        </div>
        <div>
        <img id='restroImage' src={restaurant.image} alt='Restaurant' />
          <h4>{restaurant.name}</h4>
        </div>
    </div>
    </div>
  )
}

export default ViewFood