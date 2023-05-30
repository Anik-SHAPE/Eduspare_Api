const express=require("express");
const router=express.Router();

const {getBatchById,getBatch,getAllBatchByInstitute,createBatchPushToTeacher,popPlannerFB,getAllHomeWork,getAllPandingClass,createBatchPushToInstitute,deleteBatchpopInstitute,updateBatch,assignPlanner, getAllBatchByTeacher}=require("../controllers/batch");
const {getInstituteById, isActivated}=require("../controllers/institute");
const {isSignedIn,isAuthenticated,isAdmin,isAdminInstitute,isAdminInstituteTeacher}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getPlannerById}=require("../controllers/planner")
const {getTeacherById}=require("../controllers/teacher")

router.param("instituteId",getInstituteById);
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("plannerId",getPlannerById);
router.param("teacherId",getTeacherById);

router.get("/institute/batch-get/:userId/:instituteId/:batchId",isSignedIn,isAuthenticated,getBatch);
router.get("/institute/batch-getall/:userId/:instituteId",isSignedIn,isAuthenticated,getAllBatchByInstitute);

router.post("/institute/batch-create/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,createBatchPushToInstitute);
router.delete("/institute/batch-delete/:userId/:instituteId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,deleteBatchpopInstitute);
router.put("/institute/batch-update/:userId/:instituteId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,updateBatch);

//teacher routes
router.get("/teacher/batch-getall/:userId/:teacherId",isSignedIn,isAuthenticated,getAllBatchByTeacher);
router.post("/teacher/batch-create/:userId/:instituteId/:teacherId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,createBatchPushToTeacher);


router.post("/institute/assign-planner/:userId/:batchId/:plannerId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,assignPlanner)
router.post("/institute/pop-planner/:userId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,popPlannerFB);

//homework and pending class

router.get("/institute-batch-homework-all/:userId/:batchId",isSignedIn,isAuthenticated,getAllHomeWork);
router.get("/institute-batch-pending-class-all/:userId/:batchId",isSignedIn,isAuthenticated,getAllPandingClass);


module.exports=router;