const express=require("express");
const router=express.Router();


const {isAdmin,isAdminTeacher,isTeacher,isSignedIn,isAuthenticated, isAdminInstituteTeacher}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getInstituteById, getInstitute}=require("../controllers/institute");
const {getStudentById,addStudentToBatch,popStudentFromBatch,getStudent,createStudent,getAllStude,blockOPStudent, getAllStudent}=require("../controllers/student");
const {getBatchById}=require("../controllers/batch");


router.param("userId",getUserById);
router.param("studentId",getStudentById);
router.param("instituteId",getInstituteById);
router.param("batchId",getBatchById);


router.get("/get-institute-student/:userId/:studentId",isSignedIn,isAuthenticated,getStudent);
router.get("/get-ins-student-all/:userId/:instituteId",isSignedIn,isAuthenticated,getAllStudent);
router.post("/create-student-ins/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createStudent);
router.post("/block-op-ins-student/:userId/:studentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,blockOPStudent);
router.post("/add-student-to-batch/:userId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,addStudentToBatch);
router.post("/pop-student-from-batch/:userId/:batchId/:studentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,popStudentFromBatch);

module.exports=router;