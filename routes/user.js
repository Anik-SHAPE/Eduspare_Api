const express=require("express");
const router=express.Router();

const {isAdmin,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getUserById, getUser, getAllTeacher,getAllStudent, photo}=require("../controllers/user");

//param
router.param("userId",getUserById);

//get user
router.get("/user-get/:userId",getUser);
router.get("/user-teacher/:userId",isSignedIn,isAuthenticated,isAdmin,getAllTeacher);
router.get("/user-student/:userId",isSignedIn,isAuthenticated,isAdmin,getAllStudent);
router.get("/user-profile/photo/:userId",photo);




module.exports=router;