import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://dtwiwrihwwzbqxppveks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0d2l3cmlod3d6YnF4cHB2ZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTM5MjksImV4cCI6MjAyNjU4OTkyOX0.HiKXUFPC5QSGElfL_I11RClcN97lpPj3235Fq1y3nYg';
const supabase = createClient(supabaseUrl, supabaseKey);


const AddRestaurantForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 10% auto;
  border:0.5px solid gray;
  padding:3%;
  border-radius: 4px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #E03546;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const Heading= styled.h1 `
display: flex;
color: #E03546;
margin: -1% auto;
margin-bottom: 5%

`;

// const AddRestaurant = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [contactNo, setContactNo] = useState('');
//   const [address, setAddress] = useState('');
//   const [image, setImage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you can add your logic to handle form submission, like sending data to the server
//     console.log('Submitted:', { name, description, contactNo, address, image });
//     // Reset form fields
//     setName('');
//     setDescription('');
//     setContactNo('');
//     setAddress('');
//     setImage('');
//   };


const AddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    address: '',
    descriptions: '',
    image: '',
    Contact_No: ''
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
      const { data, error } = await supabase.storage.from('zomato').upload('restaurant_images/' + restaurantData.image.name, restaurantData.image);
      if (error) {
        throw error;
      }
      // https://fzdfcdjjbsnwmdvxhfrh.supabase.co/storage/v1/object/public/zomato/restaurant_images/india-flag.jpg
      // Get the URL of the uploaded image
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/zomato/restaurant_images/${restaurantData.image.name}`;
      console.log(imageUrl,"blocking zzzzzzz");
  
      // Save restaurant data to MongoDB with image URL
      const response = await axios.post('http://localhost:7000/api/restro', { ...restaurantData, image:imageUrl });
      if (response) {
        alert('Restaurant added successfully');
        // Reset form fields
        setRestaurantData({
          name: '',
          address: '',
          descriptions: '',
          image: '',
          Contact_No: ''
        });
      } else {
        alert('Failed to add restaurant');
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant');
    }
  };


  return (
    <AddRestaurantForm onSubmit={handleSubmit}>
      <Heading>Add Restaurant</Heading>
      <InputField
        type="text"
        placeholder="Restaurant Name"
        name='name'
        value={restaurantData.name}
        onChange={handleChange} required
        // onChange={(e) => setName(e.target.value)}
        // required
      />
      <TextArea
      type="text"
      name='descriptions'
        placeholder="Description"
        value={restaurantData.descriptions}
        onChange={handleChange} required
        // onChange={(e) => setDescription(e.target.value)}
        // required
      />
      <InputField
        type="number"
        placeholder="Contact Number"
        name='Contact_No'
        value={restaurantData.Contact_No}
        onChange={handleChange} required
        // onChange={(e) => setContactNo(e.target.value)}
        // required
      />
      <InputField
        type="text"
        placeholder="Address"
        name='address'
        value={restaurantData.address}
        onChange={handleChange} required
        // onChange={(e) => setAddress(e.target.value)}
        // required
      />
      <InputField
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <SubmitButton type="submit">Add Restaurant</SubmitButton>
    </AddRestaurantForm>
  );
};

export default AddRestaurant;




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0d2l3cmlod3d6YnF4cHB2ZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTM5MjksImV4cCI6MjAyNjU4OTkyOX0.HiKXUFPC5QSGElfL_I11RClcN97lpPj3235Fq1y3nYg


// https://dtwiwrihwwzbqxppveks.supabase.co
