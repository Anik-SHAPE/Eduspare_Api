const Notification=require("../models/notification");

exports.getNotificationById=(req,res,next,id)=>{
    
    Notification.findById(id).exec((err,notification)=>{
        if(err){
            return res.status.json({
                error:"Error in DB"
            })
        }
        req.notification=notification;
        next();
    })

};


exports.getNotification=(req,res)=>{

    res.json(req.notification);
};


exports.createNotificationPushBatch=(req,res)=>{
    let batch=req.batch;
    if(batch.notificationList.length==10){
        Notification.find({_id:batch.notificationList[0]}).remove((err,notification)=>{
            if(err){
                return res.status(400).json({
                    error:"error in db"
                })
            }
            var index=batch.notificationList.indexOf(batch.notificationList[0]);
            if(index>-1){
                batch.notificationList.splice(1,index);
            }
            batch.save();

        })
    }
    let notification=new Notification(req.body);
     notification.save((err,notification)=>{
         if(err){
             return res.status(400).json({
                 error:"error in db"
             })
         }
         batch.notificationList.push(batch._id);
         batch.save();
     });


};


exports.updateNotification=(req,res)=>{
    Notification.findOneAndUpdate(
        {_id:req.notification._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,notification)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with notification DB"
                });
            }
           res.json(notification);
        }
    );
}


exports.removeNotification=(req,res)=>{

    let batch=req.batch;
    let notification=req.notification;
    notification.remove((err,notification)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            })
        }

        var index=batch.notificationList.indexOf(notification._id);
        if(index>-1){
            batch.notificationList.splice(1,index);
        }
        batch.save((err,batch)=>{
            res.json(notification);
        });
    })

};




exports.getAllNotificationsByBatch=(req,res)=>{

    Notification.find({_id:req.batch.notificationList}).exec((err,notifications)=>{
        if(err){
            return res.status(400).json({
                error: "Error in db"
            })
        }
        res.json(notifications);
    })

}