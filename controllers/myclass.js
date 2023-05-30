const Institute=require("../models/institute");
const MyClass=require("../models/myclass");
const User=require("../models/user");
const Batch=require("../models/batch");
const Student=require("../models/student");
const Billing=require("../models/billing");

exports.getMyClassById=(req,res,next,id)=>{
    MyClass.findById(id).exec((err,myclass)=>{
        if(err){
            return res.status(400).json({
                error:"Errror to find DB"
            });
        }
        req.myclass=myclass;
        next();
    });
};

exports.getMyClass=(req,res)=>{
    let myclass=req.myclass;
    res.json(myclass);
};


exports.getAllBatchByMyClass=(req,res)=>{


    const list =[];
   Student.find({_id:req.myclass.batcheList}).exec((err,students)=>{
       if(err){
           return res.status(400).json({
               error:"Error in DB"
           });
       }
      

       students.forEach(function(student){

              student.batches.forEach(function(id){
                  list.push(id);
              });

       })

       Batch.find({
           _id:list
       }).exec((err,batchs)=>{
           res.json(batchs)
       })
     
    })  
   
}


exports.getAllBillByStudent=(req,res)=>{
    Billing.find({_id:req.teacher.billingList}).exec((err,billings)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            })
        }
        res.json(billings);
    })
}