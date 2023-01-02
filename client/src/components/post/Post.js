import React from 'react'
import './Post.css'
import { Link, useNavigate, useLocation } from "react-router-dom";

function Post({post}) {
  const PF='http://localhost:5000/images/';
  console.log(post.photo)
  var source ='';
  if(post.photo)
  {
     source = PF+post.photo;
  }
  else
  source = 'https://i.pinimg.com/736x/ce/2c/31/ce2c316d116deb9c9eef7b56ab6c1628.jpg';
  console.log(source);
  return (
    <div className='post'>
    <img
    className='postImg'
    src={source}
    />
    <div className='postInfo'>
    <div className='postCats'>
    {
      post.categories.map((c) => 
      <span className='postCat'>{c.name}</span>
      )
    }
    </div>
    <Link to={`/post/${post._id}`} style={{textDecoration:"none" , color:"inherit"}}>
    <span className='postTitle'>
    {post.title}
    </span>
    </Link>
    <hr/>
    <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
    </div>
    <p className='postDesc'>
    {post.desc}
    </p>
    </div>
  )
}

export default Post