const City=require("../models/city");

exports.getCityById=(req,res,next,id)=>{
    City.findById(id).exec((err,city)=>{
        if(err){
            return res.status(400).json({
                error: "Erro in DB"
            });
        }
        req.city=city;
        //res.json(city);
        next();
    });
};

exports.getCity=(req,res)=>{
    res.json(req.city);
};

exports.getAllCity=(req,res)=>{
    City.find().exec((err,cities)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(cities);
    });
};


exports.createCity=(req,res)=>{
    let city=new City(req.body);
    city.save((err,city)=>{
        if(err){ return res.status(400).json({ error:"error in DB" }); }
        res.json(city);
    });
    
};

exports.updateCity=(req,res)=>{
    City.findOneAndUpdate(
        {_id:req.city._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,city)=>{
            if(err){ return res.status(400).json({ error: "Error to update city" }) }
            res.json(city);
        }
    );
};

exports.removeCity=(req,res)=>{
    let city=req.city;
    city.remove((err,city)=>{
        if(err){
            return res.status(400).json({
                error: "Error to remove from DB"
            });
        }
        res.json(city);
    });
};

