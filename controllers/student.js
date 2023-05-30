const Student=require("../models/student");
const User =require("../models/user");
const MyClass=require("../models/myclass");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");



exports.getStudentById=(req,res,next,id)=>{

    Student.findById(id).exec((err,student)=>{
        if(err){
            return res.status(400).json({
                error:"Error to find db"
            })
        }
        req.student=student;
        next();
    })
  
}



exports.getStudent=(req,res)=>{
    res.json(req.student);
}


exports.createStudent=(req,res)=>{

    let student=new Student(req.body);
    // student.save((err,student)=>{
    //     if(err){
    //         return res.status(400).json({
    //             error:"Error in DB"
    //         })
    //     }
        //save teacher to institute
      
        //save teacher to user database
        // User.findOne({email:student.studentEmail},(err,user)=>{
        //     if(!user||err){

                
               let myclass=new MyClass();
            //   myclass.batcheList.push(student._id);
               myclass.save((err,mclass)=>{
                let user=new User();
                user.firstName=student.studentfirstName,
                user.lastName=student.studentlastName,
                user.email=student.studentEmail,
                user.phone=student.studentPhone,
                user.myClass=mclass._id;    
                user.save((err,user)=>{
                    student.userId=user._id;
                    student.save((err,student)=>{
                        req.institute.studentList.push(student._id);
                        req.institute.save();         
                        res.json(student);
                    });
                })
               })

             
            // }else{
            //     student.userId=user._id;
            //     student.save((err,student)=>{
            //         res.json(student);
            //    });
            // }
        //});
    //});
    
}


exports.blockOPStudent=(req,res)=>{

    let {active}=req.body;
    let student=req.student;
    student.active=active;
    student.save((err,student)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }

        res.json(student);
    })

}

exports.getAllStudent=(req,res)=>{
    
    Teacher.find({_id:req.institute.studentList}).exec((err,students)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            })
        }
        res.json(students);
    })
}


exports.addStudentToBatch=(req,res)=>{

    req.batch.students.push(req.student._id);
    res.batch.save((err,batch)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            })        
        }
        res.json(batch);
    });

}

exports.popStudentFromBatch=(req,res)=>{
    var index=req.batch.students.indexOf(req.student._id);
    if(index>-1){
        req.batch.students.splice(index,1);
    }
    req.batch.save((err,batch)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }
        res.json(batch)
    })
}