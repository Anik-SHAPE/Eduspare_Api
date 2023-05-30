
const Package=require("../models/package");

exports.getPackageById=(req,res,next,id)=>{
    Package.findById(id).exec((err,package)=>{
         if(err){
             return res.status(400).json({
                 error:"Error in DB"
             })
         }

         req.package=package;
         next();
     })
}


exports.getPackage=(req,res)=>{
    res.json(req.package);
};


exports.getAllPackage=(req,res)=>{
    let institute=req.institute;
    Package.find({_id:institute.packageList}).exec((err,packages)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            });
        }
        res.json(packages);
    })
}


exports.createPackage=(req,res)=>{
       let package=new Package(req.body);
       let institute=req.institute;
       package.save((err,package)=>{
           if(err){
               return response.status(400).json(
                    { error:"error in Db" }
                )
           }
           institute.packageList.push(package._id);
           institute.save();
           res.json(package);
       });
};



exports.updatePackage=(req,res)=>{
    Pakage.findOneAndUpdate(
        {_id:req.package._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,package)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with pakage DB"
                });
            }
           res.json(package);
        }
    );
}