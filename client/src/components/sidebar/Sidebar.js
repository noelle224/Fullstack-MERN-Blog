import React, {useState, useEffect, useContext} from 'react'
import './Sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

function Sidebar() {

  const[cat, setCats] = useState([]);
  const{user}= useContext(Context);

  useEffect(() => {
    const getCats = async()=> {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };

    getCats();
  },[])

  var source='';
  if(user.profilePic)
  {
    source=user.profilePic;
  }
  else
  source='https://images.pexels.com/photos/3640930/pexels-photo-3640930.jpeg?cs=srgb&dl=pexels-ena-marinkovic-3640930.jpg&fm=jpg'


  return (
    <div className='sidebar'>
    <div className='sidebarItem'>
    <span className='sidebarTitle'>ABOUT ME</span>
    <img
    className='Sidebarimage'
    src={source}
    />
    <p>Tell a specific story. Describe the outer world using vivid descriptions. 
    Reveal the inner world (your thoughts, mistakes, missteps, blunders, excitements, etc.) 
    Provide informed commentary (historical, political, cultural, etc.) 
    Talk to locals and describe your interactions with them</p>
    </div>
    <div className='sidebarItem'>
    <span className='sidebarTitle'>CATEGORIES</span>
    <ul className='sidebarList'>
    {
      cat.map((c) =>  (
        <Link to={`/?cat=${c.name}`} style={{textDecoration:"none" , color:"inherit"}}>
        <li className='sidebarListItem'>{c.name}</li>
        </Link>
        ))
    }
    </ul>
    </div>
    <div className='sidebarItem'>
    <span className='sidebarTitle'>Follow us</span>
    <div className='sidebarSocial'>
    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
    <i className="sidebarIcon fa-brands fa-instagram"></i>
    </div>
    </div>
    </div>
  )
}

export default Sidebar
