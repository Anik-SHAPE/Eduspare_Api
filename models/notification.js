const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;


var notificationSchema=new mongoose.Schema({
    notificationInfo:{
        type:String
    },
    Id:{
        type:String
    },
    //class-0 homework-1 others-2
    notifi_role:{
        type:Number,
        default:0
    }
});

module.exports=mongoose.model("Notification",notificationSchema);