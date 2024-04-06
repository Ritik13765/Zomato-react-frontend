import React ,{useEffect,useState} from 'react'
import './Home.css'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import SearchIcon from '@mui/icons-material/Search';
import  BackGround from './BackGround.jpg'
import cd from './cd-1.avif'
import two from './too.jpg'
import three from './three.jpg'
import cd1 from './cd2.1.avif'
import cd2 from './cd2.2.avif'
import cd3 from './cd2.3.avif'
import cd4 from './cd2.4.avif'
import {Link,NavLink} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
// import CITIES from './CITIES';

const Home = () => {
    const [data, setData] = useState(null);
    useEffect(() => {

        let data=   localStorage.getItem('userData')
        console.log(data,"dataaaaaaaa");
       let newData=  JSON.parse(data)
       console.log(newData,"newData");

       setData(newData)

   }, []);

   let remove=()=>{
    localStorage.clear('userData')
    setData(null)


   }



  return (
    <div>
        <div className='Parents'>
        <img src={BackGround} alt="imageeee" />

        <div className='Navbar'>
        <div className='navBar-left'>
       <span className='restro'> <Link to="/addrestro" id='res'>  Add restro </Link></span>
        <span className='invers'> <Link to="/view" id='res'> View Food </Link></span>


        </div>
        
        <div className='navBar-right'>
            {
                data? (<> <p id='sa'> {data.userData.name}</p>
                <span  onClick={remove}   className='floar-right2'> <NavLink  className='color-b'>  <LogoutIcon/> Logout</NavLink> </span> 
                </>
                ):
                (
                <> <span className='floar-right1'>  <NavLink  to='/signup'  className='color-c'> <LoginIcon fontSize='small'/>Sign-up</NavLink> </span> 
                <span className='floar-right2'> <NavLink  to='/login' className='color-d'> <HowToRegIcon fontSize='samll'/>Login</NavLink></span>
                </>)
            }

            {/* <span > <LoginIcon fontSize='small'/> <Link to='/login'className='login2'>Login</Link> </span>
            <span > <HowToRegIcon fontSize='samll'/><Link to='signup'className='SignUp3'>Signup</Link> </span> */}
        </div>
        </div>
        <div className='input'>
            <img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="" />

        </div>
        <div className='title'>
    <p>Discover the best food & drinks in Bhopal</p>
    <div className='input-group'>
        <select>
            <option>Gwalior</option>
            <option>Indore</option>
            <option>Jhansi</option>
            <option>Delhi</option>
            <option>Datia</option>
        </select>
        <input  type="text"  placeholder='Search for restaurent, cuisine or a dish'/>
        
    </div>
        </div>
        <div className="card-one">
            <div className="input-one">
            <img src={cd} alt="cdimage"/>
            <h2>Order Online</h2>
            <p>Stay home and order to your doorstep</p>
            </div>
            <div className="input-two">
            <img src={two} alt="two"/>
            <h2>Dining</h2>
            <p>View the city's favourite dining venues</p>
            </div>
            <div className="input-three">
                <img src={three} alt="threeimg"/>
                <h2>Nightlife and Clubs</h2>
                <p>Explore the city's top nightlife outlets</p>
            </div>

        </div>

        <div className="card-two">
            <div className="text">
            <p>Collections</p>
            <div className="intext">
                <div className="intext-left">
                <span>Explore curated lists of top restaurants, cafes, pubs, and bars in Delhi NCR, based on trends</span>
                </div>
                <div className="intext-right">
                <span>All collections in Delhi NCR</span>
                </div>
                </div>
            </div>
        </div>
        <div className="cardimg">
        <div className="card-img">
            <img src={cd1} alt="imgfgg"/>
            <p>Ramadan Specials</p>
            <p>11 Places</p>
            </div>

            <div className="card-img">
                <img src={cd2} alt="imgg"/>
                <p>So What's New?</p>
                <p>14 Places</p>
            </div>

            <div className="card-img">
            <img src={cd3} alt="imgg"/>
            <p>One Of A Kind Places</p>
            <p>6 Places</p>
            </div>

            <div className="card-img">
            <img src={cd4} alt="imgggg"/>
            <p>Let's Brunch</p>
            <p>12 Places</p>
            </div>

            </div>

            <div className='part-4'>
                <div className='heading'>
                    <h6 id='had'>Popular localities in and around Bhopal</h6>
                </div>
                <div className="namesofcity">
                    <div className="C1">
                        <h2>Maharrna Pratap Nagar</h2>
                        <p>428 place</p>
                    </div>
                    <div className="C1">
                    <h2>TT Nagar </h2>
                        <p>300 place</p>
                    </div>
                    <div className="C1">
                        <h2>Arera Colony</h2>
                        <p>247 place</p>
                    </div>
                </div>
                <div className="namesofcity" id='next'>
                    <div className="C1">
                        <h2>Gulmohar Colony</h2>
                        <p>305 place</p>
                    </div>
                    <div className="C1">
                        <h2>Koheifza</h2>
                        <p>183 place</p>
                    </div>
                    <div className="C1">
                        <h2>Peer Gate Area</h2>
                        <p>213 place</p>
                    </div>
                </div>
                <div className="namesofcity" id='secondnext'>
                    <div className="C1">
                        <h2>Habib Ganj</h2>
                        <p>115 place</p>
                    </div>
                    <div className="C1">
                        <h2>BHEL</h2>
                        <p>507 place</p>
                    </div>
                    <div className="C1">
                        <h2 id='seeee'>see more</h2>
                    </div>
                </div>
            </div>
        </div>
        {/* <CITIES/> */}

    </div>

  )
}

export default Home