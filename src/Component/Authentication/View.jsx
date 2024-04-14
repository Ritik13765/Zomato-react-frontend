import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './View.css'

const View = () => {

    let navigate=  useNavigate()
  const zomatologo = "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png";
  const [data, SetData] = useState('');
  const [search, SetSearch] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:7000/api/restro');
        console.log(response.data,"resss");
      
        SetSearch(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    SetData(e.target.value);
  };

  const handleSubmit = () => {
    let NewA = search.filter((str) => {
      return str.text === data;
    });
    SetSearch(NewA);
  };
  // show food
  const showFood=(id)=>{
    navigate(`/view/${id}/product`)
    // console.log(id,"idddddd");

  }

  return (
    <div>
 <>
      <div className='mainview'>
      <div className='insideonelogo'>
        <img src={zomatologo} alt='Zomato Logo'/>
        <h1> Search here</h1>
      </div>

          <div className="firstinput">
            <input onChange={handleChange} name='data' value={data} type="text" className="form-control" id="inputPassword2" placeholder="Search"/>
          
            <button onClick={handleSubmit} >search</button>
          </div>
      </div>
      <section className='containerview'>
       <div className='headingtop'> <h2> Best food in the Bhopal </h2> </div>
        <div className='maincardscontain'>
          
        {search.map((res, index) => (
  <div onClick={ ()=>   showFood(res._id)}   key={index} className="direction">
    <div>  <img src={res.image} className="card-img-top" alt="Restaurant" /></div>
   
   
    <div className="cardone-body">
    <div className="list-group-item"> <h4>{res.name} </h4> </div>
      <div className="list-group-item"> <h5>{res.address} </h5> </div>
    <div className="list-group-item"> <h6>{res.descriptions} </h6> </div>
    
     
    </div>
    
  </div>
))}
        </div>
      </section>
    </>
    </div>
  )
}

export default View