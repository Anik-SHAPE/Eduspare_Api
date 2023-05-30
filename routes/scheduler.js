const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getBatchById}=require('../controllers/batch');
const {getUserById}=require("../controllers/user");
const {getMyClassById}=require("../controllers/myclass");
const {getEventById,getSchedulerById,getAllEventByScheduler,assignPendingClassToHomeWork,getAllBatchSchedulersByEvents,replaceClassTopic,getEvent,getScheduler,updateEvent,assignEvent,removeEvent}=require("../controllers/scheduler");
const {getInstituteById}=require("../controllers/institute");

const { getContentById }=require("../controllers/contentbank")

//param
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("myclassId",getMyClassById);
router.param("schedulerId",getSchedulerById);
router.param("instituteId",getInstituteById);
router.param("contentId",getContentById);
router.param("eventId",getEventById);






router.get("/user-batch-schedular/:userId/:schedulerId",isSignedIn,isAuthenticated,getScheduler);
router.get("/user-get-event-scheduler-all/:userId/:schedulerId",isSignedIn,isAuthenticated,getAllEventByScheduler);
router.put("/user-event-postpond/:userId/:eventId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updateEvent);
router.get("/user-event-get/:userId/:eventId",isSignedIn,isAuthenticated,getEvent);
router.post("/user-event-assign/:userId/:batchId/:eventId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,assignEvent);
router.post("/user-event-pop/:userId/:batchId/:eventId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,removeEvent);
router.post("/user-class-replace-topic-batch-event/:userId/:batchId/:contentId/:eventId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,replaceClassTopic);
router.post("/user-assign-hw-from-panding-class/:userId/:batchId/:contentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,assignPendingClassToHomeWork);
router.post("/user-events-schedulers/:userId",isSignedIn,isAuthenticated,getAllBatchSchedulersByEvents);


module.exports=router;