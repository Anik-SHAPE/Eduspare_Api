const Billing=require("../models/billing");


exports.getBillingById=(req,res,next,id)=>{
    Billing.findById(id).exec((err,billing)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            });
        }
        req.billing=billing;
        next();
    });
};


exports.getBilling=(req,res)=>{
    res.json(req.billing);
};


exports.getBillByInstitute=(req,res)=>{
    let institute=req.institute;
    Billing.find({_id:institute.billList}).exec((err,billings)=>{
        if(err){
            return res.status(400).json({
                error:"Error in Db"
            });
        }
        res.json(billings);
    })
};



exports.getBillByMyClass=(req,res)=>{
    Billing.find({_id:req.myclass.billList}).exec((err,billings)=>{
        if(err){
            return res.json({
                error:"Error in DB"
            });
        }
        res.json(billings)
    })
}


exports.createBilling=(req,res)=>{
    let billing=new Billing(req.body);
    billing.save((err,billing)=>{
        if(err){
            return res.status(400).json(
                {
                    error:"Error in Db"
                }
            )
        }
        res.json(billing);
    });
}



exports.updateBill=(req,res)=>{
    let billing=req.billing;
    Billing.findOneAndUpdate(
        {_id:billing._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,billing)=>{
            if(err){
                return res.status(400).json({
                    error: "Error to connect with Billing"
                });
            }
            res.json(billing);
        }
    );
};
