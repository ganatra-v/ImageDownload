const express = require("express");
const router = express.Router();

const Image = require("../models/image");

async function getImages(req,res){
   let images=[];
   let {page=1,limit=2}= req.query;
   let count=0;
   try{
      if(req.headers.name)
      {
         const name= req.headers.name;
         images= await Image.find({name:name})
            .select("-__v")
            .limit(limit*1)
            .skip((page-1)*limit)
            .exec();
         await Image.countDocuments({name:name},(err,c)=>{
            if(err)
               console.log(err);
            else
               count= c;
         });
      }
      else{
         images= await Image.find()
            .select("-__v")
            .limit(limit*1)
            .skip((page-1)*limit)
            .exec();
         await Image.countDocuments({},(err,c)=>{
         if(err)
            console.log(err);
         else
            count=c;
      });
      }
      if(count==0) page=0;
      res.status(200).json({
         currentPage:page,
         totalPages:Math.ceil(count/limit),
         images:images
      });
   }
   catch(err){
      console.log(err);
      res.status(500).json({
         success:false,
         error:err
      });
   }
}
router.get("/",getImages);

module.exports= router;