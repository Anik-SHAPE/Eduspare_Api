const User=require("../models/user");
const MyClass=require("../models/myclass");
const { check,validationResult } = require('express-validator');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.mProfile=user;
        next();
    });
  };
  
  exports.getUser=(req,res)=>{
      req.mProfile.salt=undefined;
      req.mProfile.photo=undefined;
      req.mProfile.encry_password=undefined;
      req.mProfile.createdAt=undefined;
      req.mProfile.updatedAt=undefined;
      res.send(req.mProfile);
  };

  
exports.photo = (req, res) => {
    if (req.mProfile.photo.data) {
      res.set("Content-Type", req.mProfile.photo.contentType);
      return res.send(req.mProfile.photo.data);
    }else{
      res.json({
       msg: "there is no photo"
      })
    }
    // next();
  };
  
  exports.addStudent=(req,res)=>{
       
      
  };

exports.addTeacher=(req,res)=>{
  
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const {  firstname, lastname, email, phone } = fields;

    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({
        error: "Please include  fields"
      });
    }
     
    let user = new User(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big! should be less then 3 MB"
        });
      }
      user.photo.data = fs.readFileSync(file.photo.path);
      user.photo.contentType = file.photo.type;
    }
 
     user.pannelID=req.institute._id;

    //save to the DB
    user.save((err, user) => {
      if (err) {
        res.status(400).json({
          error: "Saving  lecture in DB failed"
        });
      }
      
      req.institute.teacherList.push(user._id);
      req.institute.save();
      res.json(user);
    
        
    });
  });
};

exports.getAllTeacher=(req,res)=>{
    User.find({role: 1}).exec((err,users)=>{
        if(err){
            return res.status(400).json({
                error: "ERROR TO FEATCH DATA FROM DB"
            });
        }
        res.json(users);
    });
}

exports.getAllStudent=(req,res)=>{
    User.find({role: 0}).exec((err,users)=>{
        if(err){
            return res.status(400).json({
                error: "ERROR TO FEATCH DATA FROM DB"
            });
        }
        res.json(users);
    });
}