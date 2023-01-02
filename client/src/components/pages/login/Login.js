import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../../context/Context';
import './Login.css';
import axios from 'axios';

function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {user, dispatch, isFetching} = useContext(Context);

  const handleSubmit = async(e) => {
     e.preventDefault();
     dispatch({type:"LOGIN_START"});
     try{
      const res = await axios.post("http://localhost:5000/api/authlogin/login", {
        username:userRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
     }
     catch(err) {
      dispatch({type:"LOGIN_FAILURE"}); 
     }
  };

  console.log(user);

  return (
    <div className='login'>
    <span className='loginTitle'>Login</span>
    <form className='loginForm' onSubmit={handleSubmit}>
    <label>Username</label>
    <input type='text' className="loginInput" placeholder='Enter your username...'
    ref={userRef}
    ></input>
    <label>Password</label>
    <input type='password' className="loginInput" placeholder='Enter your password...'
    ref={passwordRef}
    ></input>
    <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
    </form>
    
    <Link to="/register" style={{textDecoration:"none" , color:"inherit"}}>
    <button className='loginRegisterButton'>Register</button>
        </Link>

    </div>
  )
}

export default Login