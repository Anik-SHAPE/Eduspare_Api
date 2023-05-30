const express=require("express");
const router=express.Router();

const {isAdmin,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getGradeById,getGrade,getAllGrade,createGrade,updateGrade,deleteGrade}=require("../controllers/grade");
const {getCityById,getCity,getAllCity,createCity,updateCity, removeCity}=require("../controllers/city");

//param
router.param("userId",getUserById);
router.param("gradeId",getGradeById);
router.param("cityId",getCityById);

//get
router.get("/city-get/user/:userId/:cityId",isSignedIn,isAuthenticated,getCity);
router.get("/city-getall/user/:userId",isSignedIn,isAuthenticated,getAllCity);

//create
router.post("/city-create/user/:userId",isSignedIn,isAuthenticated,isAdmin,createCity);
//update
router.put("/city-update/user/:userId/:cityId",isSignedIn,isAuthenticated,isAdmin,updateCity);
//delete
router.delete("/city-delete/user/:userId/:cityId",isSignedIn,isAuthenticated,isAdmin,removeCity);


module.exports=router;