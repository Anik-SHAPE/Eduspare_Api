const ContentBank=require("../models/contentbank");
const Institute=require("../models/institute");
const User=require("../models/user");

exports.getContentById=(req,res,next,id)=>{

    ContentBank.findById(id).exec((err,contentbank)=>{
        if(err){
            return res.status(400).json({
                error: "Content Not Found"
            });
        }
        req.contentbank=contentbank;
        next();
    });

};

exports.getContent=(req,res)=>{
    let contentbank=req.contentbank;
    res.json(contentbank);
};

exports.getAllContentByInstitute=(req,res)=>{
    let institute=req.institute;
    ContentBank.find({_id:institute.contentBank}).exec((err,contents)=>{
        if(err){
            return res.status(400).json({
                error: "Can't FETCH DATA FROM DB"
            });
        }
        res.json(contents);
    })
};

exports.createContent=(req,res)=>{

    let contentbank=new ContentBank(req.body);
    // let mProfile=req.mProfile;
    contentbank.save((err,contentbank)=>{
        if(err){
            return res.status(400).json({
                error: "Error to conect with Content Bank DB"
            });
        }
        req.institute.contentBank.push(contentbank._id);
        req.institute.save((err,institute)=>{
            if(err){
                return res.status(400).json({
                    error: "Error in DB"
                });
            }
          res.json(contentbank);
         
        });
       
    });

   

};

exports.updateContent=(req,res)=>{

    ContentBank.findOneAndUpdate(
        {_id:req.contentbank._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,contentbank)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with content bank DB"
                });
            }
            res.json(contentbank);
        }
    );

}


exports.deleteContent=(req,res)=>{

    let institute=req.institute;
    let contentbank=req.contentbank;

    contentbank.remove((err,cb)=>{
       if(err){
           return res.status(400).json({
               error: "DELETION IS NOT SUCCESSDFULL"
           });
       }
      
       var index=institute.contentBank.indexOf(cb._id);
       if (index > -1) {
         institute.contentBank.splice(index, 1);
       }
       institute.save((err,institute)=>{
           if(err){
               return res.status(400).json({
                   error: "Error to save in DB"
               });
           }
          res.json(cb);
       });

    });

};



exports.createContentPushTeacher=(req,res)=>{
    let contentbank=new ContentBank(req.body);
    // let mProfile=req.mProfile;
    contentbank.save((err,contentbank)=>{
        if(err){
            return res.status(400).json({
                error: "Error to conect with Content Bank DB"
            });
        }
        req.teacher.contentBank.push(contentbank._id);
        req.teacher.save((err,teacher)=>{
            if(err){
                return res.status(400).json({
                    error: "Error in DB"
                });
            }
          res.json(contentbank);
         
        });
       
    });
}

exports.getAllContentByTeacher=(req,res)=>{
    ContentBank.find({_id:req.teacher.contentBank}).exec((err,contents)=>{
        if(err){
            return bres.status(400).json({
                error:"Error in DB"
            })
        }
        res.json(contents)
    })
}