const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var schedulerSchema=new mongoose.Schema({
       events:[{
           type:ObjectId,
           ref:"Event"
        }],
        ID:{
            type:String
        }
});

module.exports=mongoose.model("Scheduler",schedulerSchema);