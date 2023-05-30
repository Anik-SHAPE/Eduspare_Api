const Lanmark=require("../models/lanmark");

exports.getLanmarkById=(req,res,next,id)=>{
    Lanmark.findById(id).exec((err,lanmark)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        req.lanmark=lanmark;
        res.json(lanmark);
        next();
    });
};

exports.getLanmark=(req,res)=>{
    res.json(req.lanmark);
};

exports.getAllLanmarkByCity=(req,res)=>{
    let city=req.city;
    Lanmark.find({_id:city.lanmarks}).exec((err,lanmarks)=>{
        if(err){
            return res.status(400).json("error to fetch data");
        }
        res.json(lanmarks);
    });
};

exports.createLanmarkPushToCity=(req,res)=>{
   
    let lanmark=new Lanmark(req.body);
    
    lanmark.city=req.city._id;
    lanmark.save((err,lanmark)=>{
        if(err){
            return res.status(400).json({
            error: "Erro to create and save in database"
        });
        }
    //  res.json(lanmark);
    req.city.lanmarks.push(lanmark._id);
    req.city.save((err,city)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect in DB"
            });
        }
      res.json({
          city,lanmark
      });
    });
    });
};

exports.removeLanmarkFromCity=(req,res)=>{
    let city=req.city;
    let lanmark=req.lanmark;

    lanmark.remove((err,lanmark)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect in DB"
            });
        }
        var index=city.lanmarks.indexOf(lanmark._id);
        if (index > -1) {
          city.lanmark.splice(index, 1);
       }
       city.save((err,city)=>{
           if(err){
            return res.status(400).json({
                error: "Error to connect in DB"
            });
           }
           res.json(city,lanmark);
       });
    });
};


exports.updateLanmark=(req,res)=>{
    Lanmark.findOneAndUpdate({_id:req.lanmark._id},{$set:req.body},{new: true, useFindAndModify: false},(err,lanmark)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(lanmark);
    });
};