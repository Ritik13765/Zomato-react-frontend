import React from 'react'
import './Cities.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CITIES = () => {
  return (
    <div>
        <div className='maincities'>
    <div className='main'>
        <h1 id='CityMainH1'>Popular localities in and around Bhopal</h1>
    </div>
    <div className="cities-name">
        <div className="cities-1">
            <h2>Maharrna Pratap Nagar  <span id='arrr'><NavigateNextIcon/> </span></h2>
            <h4>428 place</h4>
        </div>
        <div className="cities-1">
            <h2>TT Nagar  <span id='arrr'><NavigateNextIcon  /> </span>   </h2>
            <h4>300 place</h4>
        </div>
        <div className="cities-1">
            <h2>Golmohar Colony  <span id='arrr'><NavigateNextIcon /> </span></h2>
            <h4>247 place</h4>
        </div>
    </div>
    <div className="cities-name">
        <div className="cities-1">
            <h2>Arera Colony  <span id='arrr'><NavigateNextIcon/> </span></h2>
            <h4>305 place</h4>
        </div>
        <div className="cities-1">
            <h2>Khofiza <span id='arrr'><NavigateNextIcon  /> </span></h2>
            <h4>182 place</h4>
        </div>
        <div className="cities-1">
            <h2>Hbib Ganj     <span id='arrr'><NavigateNextIcon  /> </span></h2>
            <h4>213 place</h4>
        </div>
    </div>
    <div className="cities-name">
        <div className="cities-1">
            <h2>Peer Gate Area <span id='arrr'><NavigateNextIcon /> </span></h2>
            <h4>504 place</h4>
        </div>
        <div className="cities-1">
            <h2>BHEL<span id='arrr'><NavigateNextIcon  /> </span></h2>
            <h4>115 place</h4>
        </div>
        <div className="cities-1">
            <h2 id='seeee'>see more <ExpandMoreIcon id='arrow'/></h2>
        </div>
    </div>
</div>
</div>
  )
}

export default CITIES