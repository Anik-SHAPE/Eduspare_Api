const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var eventSchema=new mongoose.Schema({
      
     title:{
        type: String
      },
     date:{
          type:String
      },
      start_time:{
        type:String
      },
      end_time:{
          type:String
      },
      contentId:{
        type:ObjectId,
        ref:"ContentBank"
      },
      schedulerId:{
         type:ObjectId,
         ref:"Scheduler"
      },
      BatchId:{
        type:ObjectId,
        ref:"Batch"
      }
});

module.exports=mongoose.model("Event",eventSchema);