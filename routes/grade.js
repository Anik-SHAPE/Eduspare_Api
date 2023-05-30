const express=require("express");
const router=express.Router();

const {isAdmin,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getContentById}=require("../controllers/contentbank");
const {getInstituteById,isActivated}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");
const {getGradeById,getGrade,getAllGrade,createGrade,updateGrade,deleteGrade}=require("../controllers/grade");

//param
router.param("userId",getUserById);
router.param("contentId",getContentById);
router.param("instituteId",getInstituteById);
router.param("gradeId",getGradeById);


//User Routes
//get grade
router.get("/grade-get/user/:userId/:gradeId",isSignedIn,isAuthenticated,getGrade);
router.get("/grade-getall/user/:userId",isSignedIn,isAuthenticated,getAllGrade);
//write and update
router.post("/grade-create/user/:userId",isSignedIn,isAuthenticated,isAdmin,createGrade);
router.put("/grade-update/user/:userId/:gradeId",isSignedIn,isAuthenticated,isAdmin,updateGrade)
//delete
router.delete("/grade-delete/user/:userId/:gradeId",isSignedIn,isAuthenticated,isAdmin,deleteGrade);


module.exports=router;