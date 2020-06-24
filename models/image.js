const mongoose = require("mongoose");

const metadataSchema = mongoose.Schema({
   _id:false,
   extType:{
      type:String,
      required:true
   },
   size:{
      type:String,
      required:true
   },
   dimensions:{
      type:String,
      required:true
   }
})

const imageSchema= mongoose. Schema({
   _id:{
      type:mongoose.Types.ObjectId,
      required:true
   },
   url:{
      type:String,
      required:true
   },
   name:{
      type:String,
      required:true
   },
   type:{
      type:String,
      default:"image/png"
   },
   metadata:{
      type:metadataSchema,
   }
});

module.exports= mongoose.model("Image",imageSchema,"Images");