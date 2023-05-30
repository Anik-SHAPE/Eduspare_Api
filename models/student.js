const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;

var studentSchema=new mongoose.Schema({
    studentfirstName:{
        type:String
    },
    studentlastName:{
        type:String,
    },
    studentEmail:{
        type:String,
    },
    studentPhone:{
        type:Number
    },
    batches:[{
        type:ObjectId,
        ref:"Batch"
    }],
    billList:[{
        type:ObjectId,
        ref:"Billing"
    }],
    userId:{
        type:ObjectId,
        ref:"User"
    },
    active:{
        type:Boolean,
        default:true
    }
});


module.exports = mongoose.model("Student",studentSchema);