const express=require("express");
const router=express.Router();

const {getTeacherById,getTeacher,createTeacher,getAllTeacher,blockOPTeacher}=require("../controllers/teacher");
const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated, isAdminInstitute}=require("../controllers/auth");
const {getInstituteById}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");


router.param("userId",getUserById);
router.param("teacherId",getTeacherById);
router.param("instituteId",getInstituteById);


router.get("/get-ins-teacher/:userId/:teacherId",isSignedIn,isAuthenticated,getTeacher);
router.post("/create-ins-teacher/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstitute,createTeacher);
router.post("/teacher-ins-block/:userId/:teacherId",isSignedIn,isAuthenticated,isAdminInstitute,blockOPTeacher);
router.get("/get-All-teacher-ins/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstitute,getAllTeacher);



module.exports=router;