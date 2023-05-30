const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var citySchema=new mongoose.Schema({
    cityName:{
        type:String
    },
    lanmarks:[{
        type:ObjectId,
        ref:"Lanmark",
        required: false
    }]
});

module.exports=mongoose.model("City",citySchema);