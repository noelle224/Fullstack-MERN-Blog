import React , {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Register.css'
import axios from 'axios'

function Register() {
 const[username, setUsername] = useState("");
 const[email, setEmail] = useState("");
 const[password, setPassword] = useState("");
 const[error, setError] = useState(false);

 const handleSubmit = async(e) => {
  e.preventDefault();
  setError(false);
  try {
  const res = await axios.post("http://localhost:5000/api/auth/register",{
    username,
    email,
    password
  });
  res.data && window.location.replace("/login");
} catch(err) {
  setError(true);
}
  



  setUsername('');
  setPassword('');
  setEmail('');
 }

  return (
    <div className='register'>
    <span className='registerTitle'>Register</span>
    <form className='registerForm' onSubmit={handleSubmit}>
    <label>Username</label>
    <input 
    type='text' 
    className="registerInput" 
    placeholder='Enter your username...'
    onChange={e=>setUsername(e.target.value)}
    value={username}
    >
    </input>
    <label>Email</label>
    <input type='text' className="registerInput" placeholder='Enter your email...'
    onChange={e=>setEmail(e.target.value)}
    value={email}
    ></input>
    <label>Password</label>
    <input type='password' className="registerInput" placeholder='Enter your password...'
    onChange={e=>setPassword(e.target.value)}
    value={password}
    ></input>
    <button className='registerButton'>Register</button>
    </form>
    <Link to="/login" style={{textDecoration:"none" , color:"inherit"}}>
    <button className='loginRegisterButton'>Login</button>
        </Link>
        {
          error && <span>Something went Wrong!</span>
        }
   
    </div>
  )
}

export default Register