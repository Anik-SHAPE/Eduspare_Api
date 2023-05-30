const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getBatchById}=require('../controllers/batch');
const {getUserById}=require("../controllers/user");
const {getMyClassById}=require("../controllers/myclass");
const {getInstituteById}=require("../controllers/institute"); 
const {getNotification,getAllNotificationsByBatch,getNotificationById,updateNotification,createNotificationPushBatch,removeNotification}=require("../controllers/notification");

//param
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("instituteId",getInstituteById);
router.param("notificationId",getNotificationById);

//user routes

router.get("/get-notification-user-batch/:userId/:notificationId",isSignedIn,isAuthenticated,getNotification);
router.get("/get-notification-all-user-batch/:userId/:batchId",isSignedIn,isAuthenticated,getAllNotificationsByBatch);
router.post("/create-notification-user-batch/:userId/:batchId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createNotificationPushBatch);
router.put("/update-notification-user-batch/:userId/:batchId/:notificationId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updateNotification);
router.delete("/remove-notification-user-batch/:userId/:notificationId",isSignedIn,isAuthenticated,removeNotification);




module.exports=router;