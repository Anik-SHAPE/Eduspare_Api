require('dotenv').config();
var mongoose=require('mongoose');
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app=express();
const userauthRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const InstituteRoutes=require("./routes/institute");
const contentBankRoutes=require("./routes/contentbank");
const plannerRoutes=require("./routes/planner");
const gradeRoutes=require("./routes/grade");
const subjectRoutes=require("./routes/subject");
const cityRoutes=require("./routes/city");
const batchRoutes=require("./routes/batch");
const schedulerRoutes=require("./routes/scheduler");
const billingRoutes=require("./routes/billing");
const packageRoutes=require("./routes/package");
const notificationRoutes=require("./routes/notification");
const reportRoutes=require("./routes/report");
const teacherRoutes=require("./routes/teacher");
const studentRoutes=require("./routes/student");
const myclassRoutes=require("./routes/myclass");


//DB connection
mongoose.connect(process.env.DB,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("DB CONNECTED");
});

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes

//Master User
 app.use("/api",userauthRoutes);
 app.use("/api",userRoutes);
 app.use("/api",InstituteRoutes);
 app.use("/api",contentBankRoutes);
 app.use("/api",plannerRoutes);
 app.use("/api",gradeRoutes);
 app.use("/api",subjectRoutes);
 app.use("/api",cityRoutes);
 app.use("/api",batchRoutes);
 app.use("/api",schedulerRoutes);
 app.use("/api",billingRoutes);
 app.use("/api",packageRoutes);
 app.use("/api",notificationRoutes);
 app.use("/api",reportRoutes);
 app.use("/api",teacherRoutes);
 app.use("/api",studentRoutes);
 app.use("/api",myclassRoutes);

//TODO:User routes will import
//PORT
const port=process.env.PORT || 5000;

//port listening
app.listen(port,()=>{console.log(`server is running at port ${port}`)});
