const Report = require("../models/report");

exports.getReportById=(req,res,next,id)=>{
    Report.findById(id).exec((err,report)=>{
        if(err){return res.status(400).json({
            error:"Error in DB"
        })}
        req.report=report;
        next();
    })
}


exports.getReport=(req,res)=>{
    res.json(req.report);
}

exports.createReport=(req,res)=>{
    let report=new Report(req.body);
    report.save((err,report)=>{
        if(err){ return res.status(400).json({
            error:"Error in db"
        })}
        res.json(report)
    })
};


exports.updateAttendance=(req,res)=>{
    const {checked}=req.body;
    let report=req.report;
    report.attendance=[];
    if(checked!=null){
        checked.forEach(function(Id){
            report.attendance.push(Id);
            });
         report.save();
    }else{
      console.log("Nothing Was Assigned");
    }
};



exports.homeWorkAssign=(req,res)=>{
    let batch=req.batch;
    let report=req.report;
    let {assignHomework}=req.body;
    report.assignHomework=assignHomework;
    report.save((err,report)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            });
        }
        batch.homeworkList=report.contentId;
        batch.save();
        res.json(report);
    });
    
};


exports.getAllReportBYBatch=(req,res)=>{
    Report.find({_id:req.batch.reportList}).exec((err,reports)=>{
        if(err){return res.status(400).json({
            error:"Error in DB"
        })}res.json(reports);
    })
}
