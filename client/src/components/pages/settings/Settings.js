import React, { useContext , useState} from 'react'
import { Context } from '../../../context/Context';
import Sidebar from '../../sidebar/Sidebar'
import './Settings.css';
import axios from 'axios';

function Settings() {
  const[file, setFile] = useState(null);
  const{user, dispatch}= useContext(Context);
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[success, setSuccess] = useState(false);
  var source = '';
  if(user.profilePic)
  {
    source=user.profilePic;
  }
  else
  source = 'https://images.unsplash.com/photo-1610650138161-ef555e34fdf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1856&q=80'
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log("der")
    dispatch({type:'UPDATE_START'})
    const updatedUser = {
      userId : user._id,
      username,email,password
    };
    //console.log(updatedUser);
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      const url='http://localhost:5000/images/'
      updatedUser.profilePic = url+filename;
      try{
         const ress = await axios.post("http://localhost:5000/api/upload",data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          
         }
          );
         console.log(ress);
      }
      catch (err) {
       console.log(err);
      }
    }
      try{
        const res= await axios.put("http://localhost:5000/api/users/"+user._id, updatedUser);
        if(res.status=='200')
        {
          setSuccess(true);
          dispatch({type:"UPDATE_SUCCESS" , payload:res.data})
        }
        console.log(res);
      }
      catch(err){
      console.log(err);
      dispatch({type:'UPDATE_FAILURE'})
      }
    
    
  }

  return (
    <div className='settings'>
    <div className='settingWrapper'>
    <div className='settingsTitle'>
    <span className='settingsUpdateTitle'>Update Your Account</span>

    <span className='settingsDeleteTitle'>Delete Account</span>
    </div>
    <form className='settingsForm' onSubmit={handleSubmit}>
    <label>Profile Profile</label>
    <div className='settingsPP'>
    <img
    src={source}
    ></img>
    <label htmlFor='fileInput'>
    <i class="settingsPPIcon fa-solid fa-circle-user"></i>
    </label>
    <input type='file' 
    id='fileInput' 
    style={{display:"none"}}
    onChange={(e)=>setFile(e.target.files[0])}
    />
    </div>
    <label>Username</label>
    <input type='text' 
    placeholder={user.username}
    onChange={(e)=>setUsername(e.target.value)}
    />
    <label>Email</label>
    <input type='email' 
    placeholder={user.email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    <label>Password</label>
    <input type='password' 
    placeholder="password"
    onChange={(e)=>setPassword(e.target.value)}
    />
    <button className='settingsSubmit' type='submit'>Update</button>
    {
      success && <p className='successmsg'>Profile has been updated</p>
    }
    </form>
    </div>
    <Sidebar/>
    </div>
  )
}

export default Settings