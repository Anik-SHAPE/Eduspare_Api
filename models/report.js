const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var reportSchema=new mongoose.Schema({
    classTopic:{
        type:String
    },
    assignDate:{
        type:String
    },
    executionDate:{
        type:String
    },
    attendance:[{
      type:ObjectId,
      ref:"User"  
    }],
    assignHomework:{
        type:Boolean,
        default:false
    },
    contentId:{
        type:ObjectId,
        ref:"ContentBank"
    }
});

module.exports=mongoose.model("Report",reportSchema);
