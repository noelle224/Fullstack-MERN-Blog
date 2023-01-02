const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


router.post("/login", async(req,res) => {
try{
        const user = await User.findOne({
          username:req.body.username
        })
        !user && res.status(400).json("Wrong Credentials")
  
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong Credentials");
  
        res.status(200).json(user); 
    } catch(err) {
        res.status(500).json(err);
    }
} 
  );

  module.exports=router;