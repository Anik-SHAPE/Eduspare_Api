const Grade=require("../models/grade");

exports.getGradeById=(req,res,next,id)=>{
    Grade.findById(id).exec((err,grade)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect with db"
            });
        }
        req.grade=grade;
        res.json(grade);
        next();
    })
};


exports.getGrade=(req,res)=>{
    res.json(req.grade);
};


exports.getAllGrade=(req,res)=>{
    Grade.find().exec((err,grades)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect DB"
            });
        }
        res.json(grades);
    })
};

exports.createGrade=(req,res)=>{
     let grade=new Grade(req.body);
     grade.save((err,grade)=>{
         if(err){
            return res.status(400).json({
                error: "Error to connect DB"
            });
         }
         res.json(grade);
     });
};

exports.updateGrade=(req,res)=>{
    
    Grade.findOneAndUpdate(
        {_id: req.grade._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,grade)=>{

            if(err){
                return res.status(400).json({
                    error: "Error to connect with content Grade DB"
                });
            }
            res.json(grade);
        }
    );
};


exports.deleteGrade=(req,res)=>{
    
    req.grade.remove((err,grade)=>{

        if(err){
            return res.status(400).json({
                error: "Error to connect DB and delete"
            });
         }
    });
};



//add grade to class

exports.pushGradeToInstitute=(req,res)=>{
    let grade=req.grade;
    let institute=req.institute;
    institute.gradeList.forEach(function(err,id){
        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }

        if(grade._id != id){
            institute.gradeList.push(grade._id);
            institute.save((err,institute)=>{
            if(err){
            return res.status(400).json({
                error: "Error to connect with the database"
            });
         }
        res.json(institute);
        });
        }else{
            return res.json({
                massege:"Grade Was Already in the List"
            });
        }
    });
};


exports.removeGradeFromInstitute=(req,res)=>{
    let grade=req.grade;
    var index=req.institute.gradeList.indexOf(grade._id);
      if (index > -1) {
        req.institute.gradeList.splice(index, 1);
     }
     req.institute.save((err,institute)=>{
         if(err){
             return res.status(400).json({
                 error: "Error in DB"
             });
         }
         res.json(institute);
     });
};

//add grade to content


exports.pushGradeToContentBank=(req,res)=>{
    let grade=req.grade;
    req.contentbank.gradeList.forEach(function(err,id){
        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }
        if( grade._id != id ){
            req.contentbank.gradeList.push(grade._id);
            req.contentbank.save((err,contentbank)=>{
            if(err){
            return res.status(400).json({
                error: "Error to connect with the database"
            });
         }
        res.json(contentbank);
        });
        }else{
            return res.json({
                massege:"Grade Was Already in the List"
            });
        }
    });
};


exports.removeGradeContentBank=(req,res)=>{
    let grade=req.grade;
 

    var index=req.contentbank.gradeList.indexOf(grade._id);
      if (index > -1) {
        req.contentbank.gradeList.splice(index, 1);
     }
     req.contentbank.save((err,contentbank)=>{
         if(err){
             return res.status(400).json({
                 error: "Error in DB"
             });
         }
         res.json(contentbank);
     });

};


//assign grade to gradelist planner
exports.pushGradeToPlanner=(req,res)=>{
    let grade=req.grade;


    req.planner.gradeList.forEach(function(err,id){

        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }
        
        if( grade._id != id ){
            req.planner.gradeList.push(grade._id);
            req.planner.save((err,planner)=>{
            if(err){
            return res.status(400).json({
                error: "Error to connect with the database"
            });
         }
        res.json(planner);
        });
        }else{
            return res.json({
                massege:"Grade Was Already in the List"
            });
        }
    });
};


exports.removeGradePlanner=(req,res)=>{
    let grade=req.grade;


    var index=req.planner.gradeList.indexOf(grade._id);
      if (index > -1) {
        req.planner.gradeList.splice(index, 1);
     }
     req.planner.save((err,planner)=>{
         if(err){
             return res.status(400).json({
                 error: "Error in DB"
             });
         }
         res.json(planner);
     });

};
