const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getBatchById}=require('../controllers/batch');
const {getUserById}=require("../controllers/user");
const {getInstituteById}=require("../controllers/institute"); 
const {getReport,getReportById,createReport,updateAttendance,homeWorkAssign, getAllReportBYBatch}=require("../controllers/report");

//param
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("instituteId",getInstituteById);
router.param("reportId",getReportById);

//user routes

router.get("/get-report-user/:userId/:reportId",isSignedIn,isAuthenticated,getReport);
router.get("/get-report-all-user/:userId/:batchId",isSignedIn,isAuthenticated,getAllReportBYBatch);
router.post("/create-pakage-user/:userId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createReport);
router.post("/update-attendance-user/:userId/:reportId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updateAttendance);
router.post("/assign-homework-user/:userId/:batchId/:reportId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,homeWorkAssign)


module.exports=router;