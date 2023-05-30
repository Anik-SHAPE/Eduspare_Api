const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getBatchById}=require('../controllers/batch');
const {getUserById}=require("../controllers/user");
const {getMyClassById}=require("../controllers/myclass");

const {getInstituteById}=require("../controllers/institute"); 
const {getPackageById,getPackage,getAllPackage,createPackage,updatePackage}=require("../controllers/package");

//param
router.param("userId",getUserById);
router.param("batchId",getBatchById);
router.param("instituteId",getInstituteById);
router.param("myclassId",getMyClassById);
router.param("packageId",getPackageById);

//user routes

router.get("/get-pakage-user/:userId/:packageId",isSignedIn,isAuthenticated,getPackage);
router.get("/get-pakage-all-user/:userId/:instituteId",isSignedIn,isAuthenticated,getAllPackage);
router.post("/create-pakage-user/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createPackage);
router.put("/update-pakage-user/:userId/:packageId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updatePackage);




module.exports=router;