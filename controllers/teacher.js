const Teacher=require("../models/teacher");
const User =require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getTeacherById=(req,res,next,id)=>{

    Teacher.findById(id).exec((err,teacher)=>{
        if(err){
            return res.status(400).json({
                error:"Error to find db"
            })
        }
        req.teacher=teacher;
        next();
    })
  
}



exports.getTeacher=(req,res)=>{
    res.json(req.teacher);
}


exports.createTeacher=(req,res)=>{

    let teacher=new Teacher(req.body);
    let email=teacher.teacherEmail;

    User.findOne({email},(err,user)=>{

        if(err||!user){
            let user=new User();
            user.firstname=teacher.teacherfirstName;
            user.lastname=teacher.teacherlastName;
            user.email=teacher.teacherEmail;
            user.phone=teacher.teacherPhone;
            user.pannelID=teacher._id;
            user.role=2;
            user.save((err,u)=>{
                teacher.userId=u._id;
                teacher.instituteId=req.institute._id;
                teacher.save((err,teacher)=>{
                   if(err){
                       return res.status(400).json({
                           error:"Error in DB"
                       })
                   }
                    req.institute.teacherList.push(teacher._id);
                    req.institute.save();
                    res.json(teacher);
                   
                });
            })
           
        }else{
            return res.status(401).json({
                err: "User found in DB"
             });
        }
           
          
        })
    
    
}


exports.blockOPTeacher=(req,res)=>{

    let {active}=req.body;
    let teacher=req.teacher;
    teacher.active=active;
    teacher.save((err,teacher)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }

        res.json(teacher);
    })

}

exports.getAllTeacher=(req,res)=>{
    
    Teacher.find({_id:req.institute.teacherList}).exec((err,teachers)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            })
        }
        res.json(teachers);
    })
}