const mongoose=require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const {ObjectId}=mongoose.Schema;

var myClassSchema=new mongoose.Schema({
    batcheList:[
        {
           type:ObjectId,
           ref:"Student"    
        }
    ],
    billList:[{
        type:ObjectId,
        ref:"Billing"
    }],
    student:{
        type:ObjectId,
        ref:"User"
    }

});

module.exports=mongoose.model("MyClass",myClassSchema);