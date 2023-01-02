const express = require("express");
const app= express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const authloginroute = require("./routes/authlogin");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path=require("path");
const cors=require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to the database"))
.catch((err) => console.log(err));

const num = Math.random();

const storage = multer.diskStorage({
   destination:(req,file,cb) => {
      cb(null, "images")
   }, 
   filename : (req, file, cb) => {
     cb(null,req.body.name);
   },
   
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
   res.status(200).json("uploaded");
});


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
 });

 app.use("/api/auth", authRoute);
 app.use("/api/authlogin", authloginroute);
 app.use("/api/users", userRoute);
 app.use("/api/posts", postRoute);
 app.use("/api/categories", categoryRoute);

app.listen("5000", ()=> {
   console.log("Backend app s")
});