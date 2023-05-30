const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var plannerSchema=new mongoose.Schema({
    planner_name:{
        type:String,
        default: "planner name"
    },
    duration:{
        type:Number,
        default:1
    },
    lectures:[{
        type:ObjectId,
        ref: "ContentBank"
    }]

});

module.exports=mongoose.model("Planner",plannerSchema);