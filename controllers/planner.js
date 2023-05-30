const Planner=require("../models/planner");
const ContentBank=require("../models/contentbank");

exports.getPlannerById=(req,res,next,id)=>{
    Planner.findById(id).exec((err,planner)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        req.planner=planner;
        // res.json(planner);
        next();
    });
};

exports.getPlanner=(req,res)=>{
    res.json(req.planner);
};

exports.getAllPlannerByInstitute=(req,res)=>{

    let institute=req.institute;
    Planner.find({_id:institute.plannerList}).exec((err,planners)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(planners);
    });
};

exports.createPlannerPushInstitute=(req,res)=>{
    let planner=new Planner(req.body);
    let institute=req.institute;

    planner.save((err,planner)=>{
        if(err){
            return res.status(400).json({
                error: "Error to create in db"
            });
        }
        institute.plannerList.push(planner._id);
        institute.save((err,institute)=>{
            if(err){
                return res.status(400).json({
                    error: "Error in DB"
                });
            }
            res.json({
                institute,
                planner
            });
        })
    });
};

exports.updatePlanner=(req,res)=>{
    Planner.findOneAndUpdate(
        {_id:req.planner._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,planner)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with planner DB"
                });
            }
            res.json(planner);
        }
    );
};

exports.deletePlanner=(req,res)=>{
    let planner=req.planner;
    let institute=req.institute;

    planner.remove((err,planner)=>{
        if(err){
            return res.status(400).json({
                error: "Deletion is unsuccessfull"
            });
        }
    
        var index=institute.plannerList.indexOf(planner._id);
        if (index > -1) {
            institute.plannerList.splice(index, 1);
        }
        institute.save((err,institute)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to save data"
                });
            }
            res.json({institute,planner});
        });

    });
};

exports.deleteAllPlanner=(req,res)=>{
    let institute=req.institute;

    Planner.find({_id:institute.plannerList}).remove((err,planners)=>{
        if(err){
            return res.status(400).json({
                error: "Deletion is unsuccessfull"
            });
        }
        institute.plannerList=null;
        institute.save((err,institute)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to save data"
                });
            }
            res.json({institute,planners});
            
        })
    }); 
};


//ASIGNE lecture to content bank,

exports.assigneContentPlanner=(req,res)=>{
    const {checked}=req.body;
    let planner=req.planner;
    planner.lectures=[];
    if(checked!=null){
        checked.forEach(function(Id){
            planner.lectures.push(Id);
            });
         planner.save((err,planner)=>{
                if(err){
                    return res.status(400).json({
                        error: "Error in DB to assign content"
                    });
                }
                res.json(planner);
            });
    }else{
      console.log("Nothing Was Assigned");
    }

};

exports.removeContentFromPlanner=(req,res)=>{
    let planner=req.planner;
    let contentbank=req.contentbank;
    var index=planner.lectures.indexOf(contentbank._id);
    if (index > -1) {
      planner.lectures.splice(index, 1);
    }
    planner.save((err,planner)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(planner);
    });

};


exports.getAllContentByPlanner=(req,res)=>{
    let planner=req.planner;
    ContentBank.find({_id:planner.lectures}).exec((err,contents)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(contents);
    })
}




//teacher planner controller

exports.createPlannerPushTeacher=(req,res)=>{
    let planner=new Planner(req.body);
    let teacher=req.teacher;

    planner.save((err,planner)=>{
        if(err){
            return res.status(400).json({
                error: "Error to create in db"
            });
        }
        teacher.plannerList.push(planner._id);
        teacher.save((err,teacher)=>{
            if(err){
                return res.status(400).json({
                    error: "Error in DB"
                });
            }
            res.json(planner);
        })
    });   
}


exports.getAllplannerByTeacher=(req,res)=>{
    Planner.find({_id:req.teacher.plannerList}).exec((err,planners)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(planners);
    })
}
