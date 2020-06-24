const express = require("express");
const router = express.Router();

const Image = require("../models/image");

async function getImages(req,res){
   try{
      if(req.headers.name)
      {
         const name= req.headers.name;
         const images= await Image.find({name:name})
            .select("-__v");
         res.status(200).json(images);
      }
      else{
         const images= await Image.find().select("-__v");
         res.status(200).json(images);
      }
   }
   catch(err){
      res.status(500).json({
         success:false,
         error:err
      });
   }
}
router.get("/",getImages);

module.exports= router;