const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
    max: 255
  },
  lastname: {
    required: false,
    type: String,
    max: 255
  },
  email: {
    required: true,
    type: String,
    max: 255
  },
  password: {
    required: false,
    type: String,
    min: 5,
    max: 1024
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  pictureKey:{
    type:String,
    required:false
  },
  date: {
    type: Date,
    default: Date.now()
  },
  googleID: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model("User", userSchema, "users");
