const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var packageSchema=new mongoose.Schema({
  
      duration:{
          type:String
      },
      amount: {
          type:Number
      }

 
});

module.exports=mongoose.model("Package",packageSchema);
