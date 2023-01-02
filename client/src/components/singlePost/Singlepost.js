import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Singlepost.css'
import { Context } from '../../context/Context'


function Singlepost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  console.log("here"+user.username);
  console.log(post);

  const handleDelete = async() => {
    try{
       const url = 'http://localhost:5000/api/posts/'+post._id;
       const body = {
        username:user.username
       }
       await axios.delete(url,{
        data:{
          "username":user.username
        }
       });
       window.location.replace("/");
    }
    catch(err){
      console.log(err);
    }

  }

  const handleUpdate = async() => {
    try{
      const url = 'http://localhost:5000/api/posts/'+post._id;
      await axios.put(url,{
         username:user.username,
         title,
         desc
      });
      window.location.reload();
   }
   catch(err){
     console.log(err);
   }
  }



  useEffect(()=>{
    const getPost = async() => {
      const res = await axios.get("http://localhost:5000/api/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path])
  const PF='http://localhost:5000/images/';
  var source = '';
  if(post.photo)
  {
    source=PF+post.photo;
  }
  else
  source='https://images.unsplash.com/photo-1588839202925-a8b45f528cf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80'
  

  return (
    <div className='singlePost'>
    <div className='singlePostWrapper'>
    <img 
    className='singlePostImg'
    src={source}/>
    {
      updateMode ? <input type="text" value={title}  className='singlePostTitleInput' onChange={(e)=>setTitle(e.target.value)}/> : (
        <h1 className='singlePostTitle'>
        {post.title}
        {post && user && post.username===user.username && (
        <div className='singlePostEdit'>
        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
        </div>
    )}
    
    </h1>
      )
    }
    
    <div className='singlePostInfo'>
    <span className='singlePostAuthor'>
    <Link to={`/?user=${post.username}`} style={{textDecoration:"none" , color:"inherit"}}>
    Author : <b>{post.username}</b>
    </Link>
    
    </span>
    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
    </div>
    {
      updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (
        <p className='singlePostDesc'> 
        {post.desc}
        </p>
        
      )
      
    }
    {
      updateMode && <button className='singlePostButton' onClick={handleUpdate}>Update</button>
    }
    
    
    </div>
    </div>
  )
}

export default Singlepost