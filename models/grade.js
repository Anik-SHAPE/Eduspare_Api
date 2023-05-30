const mongoose=require("mongoose");

var gradeSchema=new mongoose.Schema({

    grade:{
        type:String,
        required:true
    }

});

module.exports=mongoose.model("Grade",gradeSchema);