const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getContentById,getContent,createContent,updateContent,deleteContent}=require("../controllers/contentbank");
const {getInstituteById,isActivated}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");
const {getSubject,createSubject,updateSubject,deleteSubject, getSubjectById, getAllSubject, subjectphoto}=require("../controllers/subject");


//param
router.param("userId",getUserById);
router.param("contentId",getContentById);
router.param("instituteId",getInstituteById);
router.param("subjectId",getSubjectById);




//GRADE USER
//get grade
router.get("/subject-get/user/:userId/:subjectId",isSignedIn,isAuthenticated,getSubject);
router.get("/subject-getall/user/:userId",isSignedIn,isAuthenticated,getAllSubject);
//write and update
router.post("/subject-create/user/:userId",isSignedIn,isAuthenticated,isAdmin,createSubject);
router.put("/subject-update/user/:userId/:subjectId",isSignedIn,isAuthenticated,isAdmin,updateSubject);
//delete
router.delete("/subject-delete/user/:userId/:subjectId",isSignedIn,isAuthenticated,isAdmin,deleteSubject);


//Get Photo subject
router.get("/subject-url/photo/:subjectId",subjectphoto);

module.exports=router;