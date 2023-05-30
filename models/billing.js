const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

var billingSchema=new mongoose.Schema({
  package:{
    type:ObjectId,
    ref:"Package"
  },
  remark:{
      type:String
  },
  billToName:{
      type:String
  },
  billFromName:{
      type:String
  },
  date:{
      type:String
  },
  strat_Date:{
      type:String
  },
  end_Date:{
      type:String
  },
  paid:{
      type:Boolean,
      default:false
  }  
 
});

module.exports=mongoose.model("Billing",billingSchema);
