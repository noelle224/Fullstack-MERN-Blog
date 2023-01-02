import React, { useState, useContext } from 'react'
import { Context } from '../../../context/Context';
import './Write.css'
import axios from 'axios';

function Write() {
  const[title, setTitle] = useState("");
  const[desc, setDesc] = useState("");
  const[file, setFile] = useState(null);
  const {user} = useContext(Context);

  console.log(desc);
  console.log(title);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("der")
    const newPost = {
      username : user.username,
      title,
      desc
    };
    console.log(newPost);
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename;
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
      try{
        const res= await axios.post("http://localhost:5000/api/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      }
      catch(err){
      console.log(err);
      }
    }
    
  }

  var source = '';
  if(file){
    source=URL.createObjectURL(file);
  }
  else
  {
    source='https://images.unsplash.com/photo-1670909770613-6c876d23f695?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  }

  return (
    <div className='write'>

    <img
    className='writeImg'
    src={source}
    />
    <form className='writeForm' onSubmit={handleSubmit}>
    <div className='writeFormGroup'>
    <label htmlFor='fileInput'>
    <i className="writeIcon fa-solid fa-plus"></i>
    </label>
    <input type='file' id='fileInput' style={{display:"none"}}
    onChange={(e)=>setFile(e.target.files[0])}
    />

    <input type='text' placeholder="Title" className='writeInput' autoFocus={true}
    onChange={(e)=>setTitle(e.target.value)}
    />

    </div>
    <div className='writeFormGroup'>
    <textarea 
    placeholder='Tell your story...' 
    type="text" 
    className='writeInput writeText'
    onChange={(e)=>setDesc(e.target.value)}
    >
    </textarea>
    </div>
    <button className='writeSubmit' type='submit'>Publish</button>
    </form>
    </div>
  )
}

export default Write