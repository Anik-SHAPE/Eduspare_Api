const mongoose=require('mongooose');

var noticeSchema=new mongoose.Schema({
    notice_name:{
        type:String,
        default:undefined
    },
    notice_description:{
        type:String,
        default:undefined
    },
    notice_url:{
        type:String,
        default:undefined
    }
});

module.exports=mongoose.model("Notice",noticeSchema);