const Batch=require("../models/batch");
const Planner=require("../models/planner");
const Scheduler=require("../models/scheduler");
const ContentBank=require("../models/contentbank");
const Event=require("../models/event");



exports.getBatchById=(req,res,next,id)=>{
    Batch.findById(id).exec((err,batch)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }

        req.batch=batch;
        //res.json(batch);
        next();
    });
};

exports.getBatch=(req,res)=>{
    res.json(req.batch);
};

exports.getAllBatchByInstitute=(req,res)=>{
    let institute=req.institute;
    Batch.find({_id:institute.batchList}).exec((err,batchs)=>{
        if(err){
            return res.json({
                error: "Error in DB"
            });
        }
        res.json(batchs);
    });
};

exports.createBatchPushToInstitute=(req,res)=>{
    let batch=new Batch(req.body);
    batch.instituteId=req.institute._id;
    batch.save((err,batch)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        let scheduler=new Scheduler();
        scheduler.save((err,scheduler)=>{
            if(err){
                return res.json({
                    error: "Error in DB"
                });
            }
            batch.scheduler=scheduler._id;
            batch.save();
        })
        req.institute.batchList.push(batch._id);
        req.institute.save((err,institute)=>{
            if(err){
                return res.json({
                    error: "Error in DB"
                });
            }
            res.json(batch);
        });
       
    });
};

exports.deleteBatchpopInstitute=(req,res)=>{
    let batch=req.batch;

    batch.remove((err,batch)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        var index=req.institute.batchList.indexOf(batch._id);
        if (index > -1) {
         req.classroom.institute.splice(index, 1);
        }
        req.institute.save((err,institute)=>{
            if(err){
                return res.status(400),json({
                    error: "Error in DB"
                });
            }
            res.json({
                batch,
                institute,
                msg: "Successfully deleted"
            });
        });
    });
};

exports.updateBatch=(req,res)=>{
    Batch.findOneAndUpdate(
        {_id:req.batch._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,batch)=>{
            if(err){
                return res.status(400).json({
                    error: "Error in Db"
                });
            }
            res.json(batch);
        }
    );
};

var getDaysInMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
   };
   
exports.assignPlanner=(req,res)=>{


    var weekDays=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekValues=[];
    let { planner_sdate }=req.body;
    let planner=req.planner;
    let batch=req.batch;
    for(var n=0;n<batch.weekdays.length;n++){
     weekValues.push(weekDays.indexOf(batch.weekdays[n]));
    }
   Scheduler.findOne({_id:req.batch.scheduler},function(err,scheduler){
       if(scheduler.events.length!=0){
          Event.find({_id:scheduler.events}).remove((err,event)=>{
           scheduler.events=[];
           scheduler.save();
          })
     
        }
   });
    var splitValue=planner_sdate.split("-");
    var cDate=[];
    var cTrack=0;
    var M=splitValue[1];
    var D=splitValue[2];
    var Y=splitValue[0];
    var date="";
    var d;
    var mDays=0;

   
   while(planner.lectures.length>cTrack){
     
   
    
     date=Y+"-"+M+"-"+D;
     splitValue=date.split("-");
     mDays=getDaysInMonth(splitValue[1],splitValue[0]);
     d=new Date(date);
     for(var j=0;j<weekValues.length;j++){
      if(weekValues[j]==d.getDay()){
        cDate.push(date);
        cTrack++;
     }
     }
     D=parseInt(D)+1;
     
     if(D>mDays){
       D=1;
       M=(parseInt(M)+1);
       if(M==13){
           M=1;
           Y=(parseInt(Y)+1);
           }
      }
     

  if(D<10){
       D=parseInt(D)+0;
       D="0"+D;
   }
   if(M<10){
       M=parseInt(M)+0;
       M="0"+M;
   }


   }


       ContentBank.find({_id:planner.lectures}).exec((err,contents)=>{
        
   
          
           for(var k=0;k<contents.length;k++){
           let event=new Event();
           

           event.title=contents[k].topicName;
           event.contentId=contents[k]._id;
           event.date=cDate[k];
           event.start_time=batch.start_time;
           event.end_time=batch.end_time;
           event.BatchId=batch._id;
           event.save((err,event)=>{
                
           Scheduler.findOne({_id:batch.scheduler},(err,scheduler)=>{
               event.schedulerId=scheduler._id;
               event.save();
               scheduler.events.push(event._id);
               scheduler.save()
           });
           

           });
           }

           Batch.findOne({_id:batch._id},(err,batch)=>{
               batch.planner=planner._id;
               batch.planner_sdate=planner_sdate;
               batch.save((err,batch)=>{
                   if(err){
                       return res.status(400).json({
                           error:"Error in fb"
                       });
                   }
                   res.json(batch);
               });
               
           });
          
       });

     


};


exports.popPlannerFB=(req,res)=>{
    let batch=req.batch;
    Scheduler.findOne({_id:batch.scheduler},function(err,scheduler){
   
   
       Event.find({_id:scheduler.events}).remove((err,events)=>{
           if(err){
               return res.status(400).json({
                   error:"error in db"
               });
           }
           if(scheduler.events.length!=0){
              scheduler.events=[];
              scheduler.save();
            }
           
            Batch.findOne({_id:batch._id},(err,batch)=>{
               batch.planner="";
               batch.planner_sdate="";
               batch.save((err,batch)=>{
                   if(err){
                       return res.status(400).json({
                           error:"Error in fb"
                       });
                   }
                   res.json(batch);
               });
           });
       });
   
       
   });






     
   

}


exports.getAllPandingClass=(req,res)=>{

    ContentBank.find({_id:req.batch.pendingClass}).exec((err,contents)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }
        res.json(contents)
    })

}

exports.getAllHomeWork=(req,res)=>{
    ContentBank.find({_id:req.homeworkList}).exec((err,contents)=>{
        if(err){
            return res.status(400).json({
                error:"Error in db"
            })
        }

        res.json(contents)
    })
}

//Teacher controller
exports.getAllBatchByTeacher=(req,res)=>{

    Batch.find({_id:req.teacher.batchList}).exec((err,batchs)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }
        res.json(batchs);
    })

}


exports.createBatchPushToTeacher=(req,res)=>{

    let batch=new Batch(req.body);
    batch.instituteId=req.institute._id;
    batch.save((err,batch)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        let scheduler=new Scheduler();
        scheduler.save((err,scheduler)=>{
            if(err){
                return res.json({
                    error: "Error in DB"
                });
            }
            batch.scheduler=scheduler._id;
            batch.save();
        })
        req.teacher.batchList.push(batch._id);
        req.teacher.save((err,teacher)=>{
            if(err){
                return res.json({
                    error: "Error in DB"
                });
            }
            res.json(batch);
        });
       
    });

}