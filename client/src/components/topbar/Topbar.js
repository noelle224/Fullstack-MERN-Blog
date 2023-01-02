import React from 'react'
import './Topbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';

function Topbar() {
  const {user, dispatch} = useContext(Context);

  const handlelogout = () => {
    dispatch({type:"LOGOUT"});
  }


  return (
    <div className='top'>
    <div className='topLeft'>
    <i className="topIcon fa-brands fa-square-facebook"></i>
    <i className="topIcon fa-brands fa-square-twitter"></i>
    <i className="topIcon fa-brands fa-square-pinterest"></i>
    <i className="topIcon fa-brands fa-instagram"></i>
    </div>
    <div className='topCenter'>
    <ul className='topList'>
    <li className='topListItem'>
    <Link to="/" style={{textDecoration:"none" , color:"inherit"}}>HOME</Link>
    </li>
    <li className='topListItem'>
    <Link to="/" style={{textDecoration:"none" , color:"inherit"}}>ABOUT</Link>
    </li>
    <li className='topListItem'>
    <Link to="/write" style={{textDecoration:"none" , color:"inherit"}}>WRITE</Link>
    </li>
    <li className='topListItem'
    onClick={handlelogout}
    >
    {user && "LOGOUT"}
    </li>
    </ul>
    </div>
    <div className='topRight'>
    {
      user ? (
        <Link to="/settings">
        <img 
    className='topImg'
    src={user.profilePic}
    />
    </Link>
      ) : (
        <>
        <ul className='topList'>
        <li className='topListItem'>
        <Link to="/login" style={{textDecoration:"none" , color:"inherit"}}>
        LOGIN
        </Link>
        </li>
        <li className='topListItem'>
        <Link to="/register" style={{textDecoration:"none" , color:"inherit"}}>
        REGISTER
        </Link>
        </li>
        </ul>
        </>
        
      )
    }
    <i className="SearchIcon fa-solid fa-magnifying-glass"></i>
    </div>
    </div>
  )
}

export default Topbar