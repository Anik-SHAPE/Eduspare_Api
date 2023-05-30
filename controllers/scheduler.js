const Scheduler=require("../models/scheduler"); 
const Event=require("../models/event");
const Batch=require("../models/batch");

exports.getSchedulerById=(req,res,next,id)=>{
    Scheduler.findById(id).exec((err,scheduler)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }

        req.scheduler=scheduler;
        next();
    });
};

exports.getEventById=(req,res,next,id)=>{
    Event.findById(id).exec((err,event)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }

        req.event=event;
        next();
    });
};

exports.getScheduler=(req,res)=>{
    res.json(req.scheduler);
};
exports.getEvent=(req,res)=>{
    res.json(req.event);
};



exports.getAllEventByScheduler=(req,res)=>{
    let scheduler=req.scheduler;
    Event.find({_id:scheduler.events}).exec((err,events)=>{
        if(err){
            return res.json({
                error: "Error in DB"
            });
        }
        res.json(events);
    });
};





exports.assignEvent=(req,res)=>{
    let event=Event(req.body);
    let scheduler=req.scheduler;
    event.save((err,event)=>{
    if(err){
        return res.json("error in DB");
    }
    scheduler.events.push(event._id);
    scheduler.save((err,scheduler)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        
    res.json(scheduler);
    });
    })
};





exports.removeEvent=(req,res)=>{
    let event=req.event;
    event.remove((err,event)=>{
        if(err){
            return res.status(400).json({
                error:"Errror in DB"
            });
        }
        let scheduler=req.scheduler;
        var index=scheduler.events.indexOf(event._id);
        if (index > -1) {
             scheduler.events.splice(index, 1);
        }
        scheduler.save((err,scheduler)=>{
            if(err){
                return res.status(400).json({
                    error:"Errror in DB"
                });
            }
            res.json(scheduler);
        })
    
    })
  
};


exports.updateEvent=(req, res)=>{
    Event.findOneAndUpdate(
        {_id:req.event._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,event)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with  DB"
                });
            }
           res.json(event);
        }
       );
}

exports.replaceClassTopic=(req,res)=>{
    
    let batch=req.batch;
    let event=req.event;
    let contentbank=req.contentbank;
    batch.pendingClass.push(event.contentId);
    batch.save((err,batch)=>{

        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }
        event.title=contentbank.topicName;
        event.contentId=contentbank._id;
        event.save((err,event)=>{
            res.json(batch);
        })
       
    })
   

    

};


exports.assignPendingClassToHomeWork=(req,res)=>{
    let contentbank=req.contentbank;
    let batch=req.batch;
    batch.homeworkList.push(contentbank._id);
    var index=batch.pendingClass.indexOf(contentbank._id);
    if(index>-1){
        batch.pendingClass.splice(1,index);
    }
    batch.save((err,batch)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            });
        }
      res.json(batch)
    })
}



exports.getAllBatchSchedulersByEvents=(req,res)=>{
   
   
    var eventIdList=[];
    var scheduleIdList=[];
    let {batchIdList}=req.body;
    Batch.find({_id:batchIdList}).exec((err,batchs)=>{
        if(err){
            return res.status(400).json({
                error: "Errror in Db"
            });
        }
    for(var i=0;i<batchs.length;i++){

        scheduleIdList.push(batchs[i].scheduler);

    }

    Scheduler.find({_id:scheduleIdList}).exec((err,schedulers)=>{
        for(var j=0;j<schedulers.length;j++){
           for(var n=0;n<schedulers[j].events.length;n++){
               eventIdList.push(schedulers[j].events[n]);
           }
        }
        Event.find({_id:eventIdList}).exec((err,events)=>{
            res.json(events);
        })
    })
   
  
       
    });
}