//Creating App
const express = require("express");
const app = express();

//Applying middleware
const bodyParser= require("body-parser");
app.use(bodyParser.json());
const morgan= require("morgan");
app.use(morgan("dev"));

//Connecting to DB
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/ImageUpload",{
   useNewUrlParser:true,
   useUnifiedTopology:true   
},(err) =>{
   if(err)
      console.error(err);
   else
      console.log("Connected to Mongo Server")
})

//Applying routes
const addImage = require("./routes/addImage");
app.use("/api/image/add",addImage);
const getImage= require("./routes/getImage");
app.use("/api/image/fetch",getImage);

//Creating Server
const http= require("http");
const server= http.createServer(app);

server.listen(3000,(err) =>{
   if(err)
      console.error(err);
   else
      console.log("Server running");
});