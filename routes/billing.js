const express=require("express");
const router=express.Router();

const {getInstituteById, isActivated, getAllInstitute}=require("../controllers/institute");
const {isSignedIn,isAuthenticated,isAdmin,isAdminInstituteTeacher}=require("../controllers/auth");
const {getUserById,getUser}=require("../controllers/user");
const {getPlannerById}=require("../controllers/planner")
const { getBillingById,createBilling,updateBill,getBillByMyClass,getBillByInstitute, getBilling } = require("../controllers/billing");
const {getMyClassById}=require("../controllers/myclass");

router.param("instituteId",getInstituteById);
router.param("myclassId",getMyClassById);
router.param("userId",getUserById);
router.param("billingId",getBillingById);

//Bill User Route
router.post("/create-bill-user/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createBilling);
router.get("/get-bill-user/:userId/:instituteId/:billingId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,getBilling);
router.get("/get-all-bill-by-instiute-user/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,getAllInstitute);
router.put("/update-bill-user/:userId/:instituteId/:billingId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updateBill);
router.get("/get-all-bill-by-myclass-user/:userId/:instituteId/:myclassId/:/:billingId",isSignedIn,isAuthenticated,getBillByMyClass);







module.exports=router;