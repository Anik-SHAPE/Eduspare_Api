const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var InstituteSchema=new mongoose.Schema({
   instituteName:{
        type:String,
        default: ""
    },
    instituteEmail:{
         type:String,
         required:true
    },
    institutePhone:{
        type:Number,
        required:true
    },
    Iphoto:{
        data:Buffer,
        contentType:String,
    },
    instituteAdmin:{
      type:String
    },
    packageList:[{
      type:ObjectId,
      ref:"Package"
    }],
    billList:[{
      type:ObjectId,
      ref:"Billing"
    }],
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
    }],
    studentList:[{
        type:ObjectId,
        ref:"Student"
    }],
    teacherList:[{
        type:ObjectId,
        ref:"Teacher"
    }],
    activate:{
        type:Boolean,
        default:true
    },
    gradeList:[{
        type:ObjectId,
        ref: "Grade"
    }],
    subjectList:[{
        type:ObjectId,
        ref: "Subject"
    }]
});


module.exports=mongoose.model("Institute",InstituteSchema);