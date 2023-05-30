const Institute=require("../models/institute");
const User=require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getInstituteById=(req,res,next,id)=>{
    Institute.findById(id).exec((err,institute)=>{
        if(err){
            return res.status(400).json({
                error:"Errror to find DB"
            });
        }
        req.institute=institute;
        next();
    });
};


exports.getInstitute=(req,res)=>{
    let institute=req.institute;
    institute.Iphoto=undefined;
    res.json(institute);
};



exports.registerInstitute=(req,res)=>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const {   instituteName, instituteEmail, institutePhone } = fields;
  
      if (!instituteName || !instituteEmail || !institutePhone) {
        return res.status(400).json({
          error: "Please include  fields"
        });
      }
  
      let institute = new Institute(fields);
  
      //handle file here
      if (file.Iphoto) {
        if (file.Iphoto.size > 3000000) {
          return res.status(400).json({
            error: "File size too big! should be less then 3 MB"
          });
        }
        institute.Iphoto.data = fs.readFileSync(file.Iphoto.path);
        institute.Iphoto.contentType = file.Iphoto.type;
      }
  
      //save to the DB
      institute.save((err, institute) => {
        if (err) {
         return res.status(400).json({
            error: "error in DB"
          });
        }
        institute.Iphoto=undefined;
        res.json(institute);
      });
    });
}

exports.getAllInstitute=(req,res)=>{
    Institute.find().exec((err,institutes)=>{
        if(err){
            return res.status(400).json({
                error: "ERROR IN DB"
            });
        }
        res.json(institutes);
    });
}


  
exports.photoInstitute = (req, res,next) => {
    if (req.institute.Iphoto.data) {
      res.set("Content-Type", req.institute.Iphoto.contentType);
      return res.send(req.institute.Iphoto.data);
    }
    next();
  };

exports.assignInsituteAdmin=(req,res)=>{

    let user=new User(req.body);
    user.role=1;
    user.pannelID=req.institute._id;
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Error in DB"
            })
        }
        req.institute.instituteAdmin=user._id;
        req.institute.save();
        res.json(user)
    })
}


exports.instituteUpdate=(req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let institute = req.institute;
    institute = _.extend(institute, fields);

    //handle file here
    if (file.Iphoto) {
      if (file.Iphoto.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      institute.Iphoto.data = fs.readFileSync(file.Iphoto.path);
      institute.Iphoto.contentType = file.Iphoto.type;
    }
    // console.log(product);

    //save to the DB
    institute.save((err, institute) => {
      if (err) {
        res.status(4000).json({
          error: "Updation of institute failed"
        });
      }
      institute.Iphoto=undefined;
      res.json(institute);
    });
  });
};


exports.isActivated=(req,res,next)=>{
    let institute=req.institute;
    if(institute.activate){
        next();
    }else{
        return res.status(400).json({
            error: "Access Denied"
        });
    }
}