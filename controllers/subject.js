const Subject=require("../models/subject");
var formidable = require("formidable");
var fs=require('fs');


exports.getSubjectById=(req,res,next,id)=>{
    Subject.findById(id).exec((err,subject)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect with db"
            });
        }
        req.subject=subject;
        subject.subject_photo=undefined;
        next();
    });
};


exports.getSubject=(req,res)=>{
    req.subject.subject_photo=undefined;
    res.json(req.subject);
};

exports.subjectphoto=(req,res)=>{
  if (req.subject.subject_photo.data) {
    res.set("Content-Type", req.subject.subject_photo.contentType);
    return res.send(req.subject.subject_photo.data);
  }
};


exports.getAllSubject=(req,res)=>{
    Subject.find().exec((err,subject)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect DB"
            });
        }
        subject.subject_photo=undefined;
        res.json(subject);
    })
};

exports.createSubject=(req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          return res.status(400).json({
            error: "problem with image"
          });
        }
        //destructure the fields
        const { subject_name } = fields;

        if (!subject_name) {
          return res.status(400).json({
            error: "Please include  fields"
          });
        }
         
        let subject = new Subject(fields);
    
        //handle file here
        if (file.subject_photo) {
          if (file.subject_photo.size > 3000000) {
            return res.status(400).json({
              error: "File size too big! should be less then 3 MB"
            });
          }
          subject.subject_photo.data = fs.readFileSync(file.subject_photo.path);
          subject.subject_photo.contentType = file.subject_photo.type;
        }
        // console.log(course);
    
        //save to the DB
        subject.save((err, subject) => {
          if (err) {
            res.status(400).json({
              error: "Saving  lecture in DB failed"
            });
          }
          subject.subject_photo=undefined;
          res.json(subject);
        });
      });
};

exports.updateSubject=(req,res)=>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let subject = req.subject;
      subject = _.extend(subject, fields);
  
      //handle file here
      if (file.subject_photo) {
        if (file.subject_photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        subject.subject_photo.data = fs.readFileSync(file.subject_photo.path);
        subject.subject_photo.contentType = file.subject_photo.type;
      }
      // console.log(product);
  
      //save to the DB
      subject.save((err, subject) => {
        if (err) {
          res.status(4000).json({
            error: "Updation of subject failed"
          });
        }
        subject.subject_photo=undefined;
        res.json(subject);
      });
    });
};


exports.deleteSubject=(req,res)=>{
   
    req.subject.remove((err,subject)=>{

        if(err){
            return res.status(400).json({
                error: "Error to connect DB and delete"
            });
         }
        // subject.subject_photo=undefined;
      //  res.json(subject);

    });
};



//add grade to class

exports.pushSubjectToInstitute=(req,res)=>{
    let subject=req.subject;
    let institute=req.institute;

    institute.subjectList.forEach(function(err,id){

        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }

        if(subject._id != id){
            institute.subjectList.push(subject._id);
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
                massege:"subject Was Already in the List"
            });
        }
    });
};


exports.removeSubjectFromInstitute=(req,res)=>{
    let subject=req.subject;
    let institute=req.institute;

    var index=institute.subjectList.indexOf(subject._id);
      if (index > -1) {
        institute.subjectList.splice(index, 1);
     }
     institute.save((err,institute)=>{
         if(err){
             return res.status(400).json({
                 error: "Error in DB"
             });
         }
         res.json(institute);
     });

};

//add grade to content


exports.pushSubjectToContentBank=(req,res)=>{
    let subject=req.subject;
    let contentbank=req.contentbank;

    contentbank.subjectList.forEach(function(err,id){

        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }
        
        if( subject._id != id ){
            contentbank.subject=subject._id;
            contentbank.save((err,contentbank)=>{
            if(err){
            return res.status(400).json({
                error: "Error to connect with the database"
            });
         }
        res.json(contentbank);
        });
        }else{
            return res.json({
                massege:"Subject Was Already in the List"
            });
        }
    });
};


// exports.removeSubjectContentBank=(req,res)=>{
//     const subject=req.grade;
//     const contentbank=req.contentbank;

//     var index=contentbank.subjectList.indexOf(subject._id);
//       if (index > -1) {
//         contentbank.subjectList.splice(index, 1);
//      }
//      contentbank.save((err,contentbank)=>{
//          if(err){
//              return res.status(400).json({
//                  error: "Error in DB"
//              });
//          }
//          res.json(contentbank);
//      });

// };


//planner section

exports.pushSubjectToPlanner=(req,res)=>{
    let subject=req.subject;
    let planner=req.planner;

    planner.subjectList.forEach(function(err,id){

        if(err){
            return res.status(400).json({
                error: "ERROR TO FETCH FROM DB"
            });
        }
        
        if( subject._id != id ){
            planner.subjectList.push(subject._id);
            planner.save((err,planner)=>{
            if(err){
            return res.status(400).json({
                error: "Error to connect with the database"
            });
         }
        res.json(planner);
        });
        }else{
            return res.json({
                massege:"Subject Was Already in the List"
            });
        }
    });
};


exports.removeSubjectPlanner=(req,res)=>{
    let subject=req.grade;
    let planner=req.planner;

    var index=planner.subjectList.indexOf(subject._id);
      if (index > -1) {
        planner.subjectList.splice(index, 1);
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
