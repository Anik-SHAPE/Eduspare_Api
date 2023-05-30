const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getBatchById}=require('../controllers/batch');
const {getUserById}=require("../controllers/user");
const {getMyClassById,getAllBillByStudent,getMyClass,getAllBatchByMyClass}=require("../controllers/myclass");
const {getStudentById,getStudent}=require("../controllers/student");

//param
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("myclassId",getMyClassById);
router.param("studentId",getStudentById);


router.get("/get-myclass/:userId/:myclassId",isSignedIn,isAuthenticated,getMyClass);
router.get("/get-myclass-batch-all/:userId/:myclassId",isSignedIn,isAuthenticated,getAllBatchByMyClass);
router.get("/get-myclass-bill-student-all/:userId/:studentId",isSignedIn,isAuthenticated,getAllBillByStudent);



module.exports=router;