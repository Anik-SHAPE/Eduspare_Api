const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

var contentBankSchema=new mongoose.Schema({
    topicName:{
        type:String,
        default:""
    },
    topicDescription:{
        type:String,
        default: ""
    },
    videoLinkOne:{
        type:String,
        default:""
    },
    videoLinkOneTitle:{
        type:String,
        default:"Lecture One"
    },
    videoLinkTwo:{
        type:String,
        default:""
    },
    videoLinkTwoTitle:{
        type:String,
        default:"Lecture Two"
    },
    videoLinkThree:{
        type:String,
        default:""
    },
    videoLinkThreeTitle:{
        type:String,
        default:"Lecture Three"
    },
    audioLink:{
        type:String,
        default:""
    },
    audioTitle:{
        type:String,
        default:"Lecture Audio"
    },
    subject:{
        type:String,
        default:"All Subject"
    },
    noteList:[{
        type:ObjectId,
        ref:"Note"
    }],
     InstituteId:{
        type:ObjectId,
        ref: "Institute"
    },
});


module.exports=mongoose.model("ContentBank",contentBankSchema);