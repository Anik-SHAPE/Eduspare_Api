const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var noteSchema=new mongoose.Schema({
    docName:{
        type:String,
        default:""
    },
    docurl:{
        type:String,
        default:""
    },
    homework:{
      type:Boolean,
      default:false 
    },
    content:{
        type:ObjectId,
        ref: "ContentBank"
    }
});

module.exports=mongoose.model("Note",noteSchema);