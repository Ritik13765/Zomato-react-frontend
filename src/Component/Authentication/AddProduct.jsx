import React, { useState } from 'react'
import axios from 'axios'
import './Addproduct.css'
import {useNavigate, useParams } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://dtwiwrihwwzbqxppveks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0d2l3cmlod3d6YnF4cHB2ZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTM5MjksImV4cCI6MjAyNjU4OTkyOX0.HiKXUFPC5QSGElfL_I11RClcN97lpPj3235Fq1y3nYg';
const supabase = createClient(supabaseUrl, supabaseKey);



const AddProduct = () => {


    let {id} =   useParams()

  const [restaurantData, setRestaurantData] = useState({
    name: '',
    description: '',
    image: '',
    price:''


  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setRestaurantData({ ...restaurantData, image: file });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Supabase
      const { data, error } = await supabase.storage.from('zomato').upload('product_images/' + restaurantData.image.name, restaurantData.image);
      if (error) {
        throw error;
      }
      // https://fzdfcdjjbsnwmdvxhfrh.supabase.co/storage/v1/object/public/zomato/restaurant_images/india-flag.jpg
      // Get the URL of the uploaded image
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/zomato/product_images/${restaurantData.image.name}`;
      console.log(imageUrl,"blocking zzzzzzz");
  
      // Save restaurant data to MongoDB with image URL
      const response = await axios.post('http://localhost:7000/api/product', { ...restaurantData, image:imageUrl ,restroId:id});
      if (response) {
        alert('Restaurant added successfully');
        // Reset form fields
     
      } else {
        alert('Failed to add restaurant');
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant');
    }
  };


  return (
    <div className='fullformofproduct'>
       <div className='hedo'> <h2>Add Product</h2> </div>
        <form className='hallinput' onSubmit={handleSubmit}>
            <div className='form-group'>
                {/* <label>Name:</label> */}
                <input className='setallbox' type="text" name='name' value={restaurantData.name} onChange={handleChange} placeholder='Product Name'/>
            </div>
            <div className="form-group">
          {/* <label>Price:</label> */}
          <input className='setallbox' type="text" name="price" placeholder='Price' value={restaurantData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          {/* <label>Description:</label> */}
          <input className='setallbox' type="text" name="description" placeholder='Description' value={restaurantData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          {/* <label>Image:</label> */}
          <input className='setallbox' type="file" onChange={handleImageChange} accept="image/*" required />
        </div>

        <button id='addfinish' type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct