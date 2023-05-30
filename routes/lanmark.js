const express=require("express");
const router=express.Router();

const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getCityById,getCity,getAllCity,createCity,updateCity, removeCity}=require("../controllers/city");
const {getLanmarkById,getLanmark,createLanmarkPushToCity,removeLanmarkFromCity,getAllLanmarkByCity,updateLanmark}=require("../controllers/lanmark");
const { getInstituteById } = require("../controllers/institute");


router.param("instituteId",getInstituteById);
router.param("userId",getUserById);
router.param("cityId",getCityById);
router.param("lanmarkId",getLanmarkById);



//User Routes
//get...
router.get("/city/lanmark/user/:userId/:cityId/:lanmarkId",isSignedIn,isAuthenticated,getLanmark);
router.get("/city/lanmark-all/user/:userId/:cityId",isSignedIn,isAuthenticated,getAllLanmarkByCity);
//create...
router.post("/city/lanmark-create/user/:userId/:cityId",isSignedIn,isAuthenticated,createLanmarkPushToCity);
//remove
router.delete("/city/lanmark-remove/user/:userId/:cityId/:lanmarkId",isSignedIn,isAuthenticated,isAdmin,removeLanmarkFromCity);
//update
router.put("/city/lanmark-update/user/:userId/:cityId/:lanmarkId",isSignedIn,isAuthenticated,isAdmin,updateLanmark);

module.exports=router;