const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var lanmarkSchema=new mongoose.Schema({
    lanmarkName:{
        type:String
    },
    city:{
        type:ObjectId,
        ref: "City"
    }
});

module.exports=mongoose.model("Lanmark",lanmarkSchema);
