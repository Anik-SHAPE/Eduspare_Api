var express = require('express');
var router=express.Router();

//My Routes
var {SignUp,SignIn,SignOut}=require("../controllers/auth");


//Master Users
router.post("/signup",SignUp);

router.post("/signin",SignIn);

router.get("/signout",SignOut);


module.exports=router;