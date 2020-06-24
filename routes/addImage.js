const express = require("express");
const router= express.Router();

const Image= require("../models/image");
const mongoose = require("mongoose");
const fs = require("fs");
const request = require("request");
const sizeOf = require("image-size");

//Function to add image
async function addImage(req,res){
   try{
      const urls= req.body.url;
      const name= req.body.name;
      const id = new mongoose.Types.ObjectId();
      const url= new URL(urls);
      const filename = url.pathname.split('/').reverse()[0]
      const ext = filename.split('.').reverse()[0];
   
      if(ext!=="jpg"&& ext!=="jpeg" && ext !== "png")
         res.status(400).json({
            success:false,
            message:"Please provide jpg/jpeg/png type image"
         });
      else{
         downloadImage(urls,id,ext, async () => {
            console.log("Image Saved");
            const stats= fs.statSync("Uploads/"+id+"."+ext);
            const size=stats["size"]/1000+"KB";
            const dimensions = sizeOf("Uploads/"+id+"."+ext);
            const newImage= await new Image({
               _id:id,
               url:url,
               name:name,
               type:"image/"+ext.toLowerCase(),
               metadata:{
                  size:size,
                  extType:ext,
                  dimensions:dimensions.width+"x"+dimensions.height
                  }
               }).save();
            res.status(200).json({
               id:newImage._id,
               url:newImage.url,
               name:newImage.name,
               type:newImage.type,
               metadata:newImage.metadata
            });
         });
      }
   }
   catch(err){
         console.error(err);
         res.status(500).json({
            success:false,
            error:"Internal Server Error" 
         })
      }
}

function downloadImage(url,id,ext,callback){
   request.head(url, (err,response,body) =>{
      console.log(err);
      request(url)
      .pipe(fs.createWriteStream("Uploads/"+id+"."+ext))
      .on("close",callback);
  })
}

//Applying route
router.post("/",addImage);

module.exports=router;