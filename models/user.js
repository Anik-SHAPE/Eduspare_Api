const mongoose = require('mongoose');
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const {ObjectId}=mongoose.Schema;

var userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    photo:{
      data:Buffer,
      contentType:String
    },
    qrcode:{
      data:Buffer,
      contentType:String
    },
    upiID:{
      type:String
    },
    payMentNumber:{
      type:Number
    },
    city:{
      type:ObjectId,
      ref:"City"
    },
    lanmark:{
      type:ObjectId,
      ref: "Lanmark"
    },
    role:{           //2 Student default  value 
      type:Number,  //1 - Teacher User
      default:3    //0 - Admin User
    },
   pannelID:{
     type:String,
     default:undefined
   },
   encry_password:{
        type:String,
        trim:true,
    },
   salt: String,
},
{timestamps:true}
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);