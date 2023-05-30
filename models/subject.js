const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var subjectSchema=new mongoose.Schema({
    subject_name:{
        type:String,
        required:true
    },
    subject_photo:{
        data:Buffer,
        contentType:String
    }
});

module.exports=mongoose.model("Subject",subjectSchema);