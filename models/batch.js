const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var batchSchema=new mongoose.Schema({
  batchname:{
    type:String,
    default: "Batch Name"
  },
  start_time:{
    type:String
  },
  end_time:{
    type:String
  },
  weekdays:[{
    type:String
  }],
  planner_sdate:{
    type:String
  },
  planner:{
    type:String,         
  },
  scheduler:{
    type:ObjectId,
    ref:"Scheduler"
  },
  teacher:{
    type:ObjectId,
    ref:"Teacher"
  },
  students:[{
    type:ObjectId,
    ref:"Student"
  }],
  notificationList:[{
    type:ObjectId,
    ref:"Notification"
  }],
  homeworkList:[{
          type:ObjectId,
          ref: "ContentBank"
      }],
  reportList:[{
    type:ObjectId,
    ref:"Report"
  }],
  pendingClass:[{
    type:ObjectId,
    ref:"ContentBank"
  }],
  instituteId:{
        type:ObjectId,
        ref: "Institute"
  }
});

module.exports=mongoose.model("Batch",batchSchema);
