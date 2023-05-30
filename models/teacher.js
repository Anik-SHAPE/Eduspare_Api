var mongoose = require("mongoose");
var {ObjectId}=mongoose.Schema;

var teacherSchema=new mongoose.Schema({

    teacherfirstName:{
        type:String
    },
    teacherlastName:{
        type:String,
    },
    teacherEmail:{
        type:String
    },
    teacherPhone:{
        type:Number
    },
    instituteId:{
        type:ObjectId,
        ref:"Institute"
    },
    userId:{
       type:ObjectId,
       ref:"User"
    },
    active:{
        type:Boolean,
        default:true
    },
    contentBank:[{
        type:ObjectId,
        ref:"ContentBank"
    }],
    batchList:[{
        type:ObjectId,
        ref:"Batch"
    }],
    plannerList:[{
        type:ObjectId,
        ref:"Planner"
    }]

});


module.exports = mongoose.model("Teacher",teacherSchema);