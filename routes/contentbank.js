const express=require("express");
const router=express.Router();


const {isAdmin,isAdminInstituteTeacher,isSignedIn,isAuthenticated}=require("../controllers/auth");
const {getContentById,getContent,getAllContentByInstitute,createContent,updateContent,deleteContent, getAllContentByTeacher, createContentPushTeacher}=require("../controllers/contentbank");
const {getInstituteById,isActivated}=require("../controllers/institute");
const {getUserById}=require("../controllers/user");
const { pushGradeToContentBank,removeGradeContentBank,getGradeById } = require("../controllers/grade");
const {pushSubjectToContentBank,getSubjectById}=require("../controllers/subject");
const {getNoteById,getNote,updateNote,getAllHomeWorkNote,getAllPreHomorkNote,createNotePushContent,removeNotePopContent, getAllNoteByContent}=require("../controllers/notes");
const {getTeacherById}=require("../controllers/teacher")

//param
router.param("userId",getUserById);
router.param("contentId",getContentById);
router.param("instituteId",getInstituteById);
router.param("gradeId",getGradeById);
router.param("subjectId",getSubjectById);
router.param("noteId",getNoteById);
router.param("teacherId",getTeacherById);



//User Routes
//content routes
//read
router.get("/content-get/user/:userId/:contentId",isSignedIn,isAuthenticated,getContent);
//write
router.post("/content-create/user/:userId/:instituteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,createContent);
//update
router.put("/content-update/user/:userId/:instituteId/:contentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,updateContent);
//delete
router.delete("/content-delete/user/:userId/:instituteId/:contentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,isActivated,deleteContent);
//get ALL
router.get("/content-all/user/:userId/:instituteId",isSignedIn,isAuthenticated,isActivated,getAllContentByInstitute);


//teacher route
router.get("/content-all/teacher/:userId/:teacherId",isSignedIn,isAuthenticated,getAllContentByTeacher);
router.post("/content-create/teacher/:userId/:teacherId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createContentPushTeacher);





//notes route
//read
router.get("/user-content/note-get/:userId/:noteId",isSignedIn,isAuthenticated,getNote);
//write
router.post("/user-content/note-create/:userId/:contentId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,createNotePushContent);
//update
router.put("/user-content/note-update/:userId/:noteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,updateNote);
//delete
router.delete("/user-content/note-delete/:userId/:contentId/:noteId",isSignedIn,isAuthenticated,isAdminInstituteTeacher,removeNotePopContent);
//get-all
router.get("/user-content/note-get-all/:userId/:contentId",isSignedIn,isAuthenticated,getAllNoteByContent);
//get-all-homework
router.get("/user-content/note-get-all-homework/:userId/:contentId",isSignedIn,isAuthenticated,getAllHomeWorkNote);
//get-all-prehomework
router.get("/user-content/note-get-all-prehomework/:userId/:contentId",isSignedIn,isAuthenticated,getAllPreHomorkNote);



// //add grade
// router.post("/content/grade-add/:userId/:contentId/:gradeId",isSignedIn,isAuthenticated,isAdminTeacher,pushGradeToContentBank);
// router.post("/content/grade-remove/:userId/:contentId/:gradeId",isSignedIn,isAuthenticated,isAdminTeacher,removeGradeContentBank);
//add Subject
//router.post("/content/subject-add/:userId/:contentId/:subjectId",isSignedIn,isAuthenticated,isAdminTeacher,pushSubjectToContentBank);
// router.post("/content/subject-remove/:userId/:contentId/:subjectId",isSignedIn,isAuthenticated,isAdminTeacher,removeSubjectContentBank);


module.exports=router;