const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getContentById}=require("../controllers/contentbank");
const {getInstituteById,getInstitute,instituteUpdate,isActivated, getAllInstitute,photoInstitute,registerInstitute, assignInsituteAdmin}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");
const {getGradeById, pushGradeToInstitute,removeGradeFromInstitute}=require("../controllers/grade");
const {pushSubjectToInstitute,removeSubjectFromInstitute,getSubjectById}=require("../controllers/subject");



//param
router.param("userId",getUserById);
router.param("contentId",getContentById);
router.param("instituteId",getInstituteById);
router.param("gradeId",getGradeById);
router.param("subjectId",getSubjectById);

//Eduspare Admin
//get All
router.get("/institute-all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllInstitute);
//Teacher ADMIN
//read
router.get("/teacher-institute-user/:userId/:instituteId",isSignedIn,isAuthenticated,getInstitute);
//update
router.put("/teacher-institute-update/user/:userId/:instituteId",isSignedIn,isAuthenticated,isActivated,instituteUpdate);
//Grade
router.post("/teacher-institute/grade-add/:userId/:instituteId/:gradeId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,pushGradeToInstitute);
router.post("/teacher-institute/grade-remove/:userId/:instituteId/:gradeId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,removeGradeFromInstitute);
//subject
router.post("/teacher-institute/subject-add/:userId/:instituteId/:subjectId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,pushSubjectToInstitute);
router.post("/teacher-institute/subject-remove/:userId/:instituteId/:subjectId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,removeSubjectFromInstitute);
router.post("/register-institute",registerInstitute)
router.get("/get-ins-photo/:instituteId",photoInstitute);
router.post("/assign-institute-admin/:instituteId",assignInsituteAdmin);


module.exports=router;