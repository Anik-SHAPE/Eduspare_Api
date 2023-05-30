//need to work in the planner controller
const express=require("express");
const router=express.Router();


const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getInstituteById,isActivated}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");
const {getContentById}=require("../controllers/contentbank");
const {getPlannerById,getPlanner,createPlannerPushTeacher,getAllplannerByTeacher,getAllPlannerByInstitute,updatePlanner,deletePlanner,deleteAllPlanner,createPlannerPushInstitute,assigneContentPlanner,removeContentFromPlanner,getAllContentByPlanner}=require("../controllers/planner");
const {getTeacherById}=require("../controllers/teacher")

//param
router.param("userId",getUserById);
router.param("contentId",getContentById);
router.param("instituteId",getInstituteById);
router.param("plannerId",getPlannerById);
router.param("teacherId",getTeacherById);

//PLANNER ROUTES


//USER ROUTES
//get
router.get("/user/planner-get/:userId/:instituteId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,getPlanner);
//create
router.post("/user/planner-create/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,createPlannerPushInstitute);
//update
router.put("/user/planner-update/:userId/:instituteId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,updatePlanner);
//delete
router.delete("/user/planner-delete/:userId/:instituteId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,deletePlanner);
//get ALL
router.get("/user/planner-all/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,getAllPlannerByInstitute);

//CONTENT BANK
//add content to planner
router.post("/planner-user/assign-contents/:userId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,assigneContentPlanner);
//remove from planner
router.post("/planner-user/content-remove/:userId/:plannerId/:contentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,removeContentFromPlanner);
//get all content by planner
router.get("/planner-user/get-all-contents/:userId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,getAllContentByPlanner);


//Teacher planner
router.post("/teacher/planner-create/:userId/:teacherId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createPlannerPushTeacher);
router.get("/teacher/planner-all/:userId/:teacherId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,getAllplannerByTeacher);





// const {pushGradeToPlanner,removeGradePlanner,getGradeById } = require("../controllers/grade");
// const {pushSubjectToPlanner,removeSubjectPlanner,getSubjectById}=require("../controllers/subject");
//router.param("gradeId",getGradeById);
//router.param("subjectId",getSubjectById);
// //add grade
// router.post("/planner/grade-add/:userId/:plannerId/:gradeId",isSignedIn,isAuthenticated,isAdminTeacher,pushGradeToPlanner);
// router.post("/planner/grade-remove/:userId/:plannerId/:gradeId",isSignedIn,isAuthenticated,isAdminTeacher,removeGradePlanner);
// //add Subject
// router.post("/planner/subject-add/:userId/:plannerId/:subjectId",isSignedIn,isAuthenticated,isAdminTeacher,pushSubjectToPlanner);
// router.post("/planer/subject-remove/:userId/:planner/:subjectId",isSignedIn,isAuthenticated,isAdminTeacher,removeSubjectPlanner);

module.exports=router;