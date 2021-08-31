const express = require("express");
const router = express.Router();
const User = require("../model/User");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const multer = require("multer");
const passportConfig=require('../google');
const passport=require('passport')
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Notify",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const upload = multer({ storage: storage });
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "SendGrid",
    auth: {
      user: process.env.sendgrid_id,
      pass: process.env.sendgrid_pw
    }
  })
);
//google Oauth
router.get('/google',passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login','email'] }),async(req,res)=>{

})
router.get('/redirect',passport.authenticate('google'),async(req,res)=>{
  let user=req.user
  const token = jwt.sign({ id:user._id}, process.env.TOKEN_SECRET, {
    expiresIn: "5h"
  });
  let img=encodeURIComponent(user.picture);
  res
    .status(200)
    .cookie("Authorization", token, { httpOnly: true })
    .redirect(`http://notifyapp.tk/home?role=${user.role}&googleid=${user.googleID}&picture=${img}&name=${user.firstname}&email=${user.email}`);
    

});
router.post("/register", async (req, res) => {
  const user = req.body;
  let ExistingUser = await User.findOne({ email: user.email });
  if (ExistingUser) return res.status(400).send("User already exists");
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "3m" });
  let link = `<a href="http://notifyapp.tk/account/register/${token}">Confirm</a>`;
  let info = await transporter.sendMail({
    from: "notifyapp96@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: "Email Confirmation", // Subject line
    html: `<p>Please click on the link below to confirm your email address</p> <br> ${link}` // html body
  });
  info.messageId ? res.sendStatus(200) : res.sendStatus(400);
});
//confirmation email route.
router.get("/register/:token", async (req, res) => {
  const token = req.params.token;

  try {
    let picture;
    const validate = jwt.verify(token, process.env.TOKEN_SECRET);
    const ExistingUser = await User.findOne({ email: validate.email });
    if (ExistingUser) return res.send(`<h4>User already registered</h4>`);
    picture =
      validate.gender == "Male"
        ? "user_images/male.png"
        : "user_images/female.png";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validate.password, salt);
    let newUser = new User({
      firstname: validate.fname,
      lastname: validate.lname,
      email: validate.email,
      password: hashedPassword,
      role: "user",
      picture: picture,
      country: validate.country,
      gender: validate.gender
    });
    await newUser.save();
    req.io.emit('newUser')
    res.redirect(`http://notifyapp.tk`);
  } catch (err) {
    res.send(`<h4>This link has expired</h4>`);
  }
});

//login
router.post("/login", async (req, res) => {
  const user = req.body;
  const ExistingUser = await User.findOne({ email: user.email });
  if (!ExistingUser) return res.status(401).send(`This email doesn't exist`);
  const comparePasswords = await bcrypt.compare(
    user.password,
    ExistingUser.password
  );
  if (!comparePasswords) return res.status(401).send(`Incorrect Password`);
  const token = jwt.sign({ id: ExistingUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: "5h"
  });
  res
    .status(200)
    .cookie("Authorization", token, { httpOnly: true })
    .send(ExistingUser);
});
router.post("/picture", upload.single("profile_picture"), async (req, res) => {
  const email = req.body.email;
  const filePath = req.file.url;
  const user = await User.findOne({ email: email });
  if (
    user.picture != "user_images/male.png" &&
    user.picture != "user_images/female.png"
  ) {
    await cloudinary.uploader.destroy(user.pictureKey);
  }
  user.picture = filePath;
  user.pictureKey = req.file.public_id;
  await user.save();
  res.status(200).send(filePath);
});

router.put("/change-pw", async (req, res) => {
  const email = req.query.email;
  const existinguser = await User.findOne({ email: email });
  if (!existinguser) return res.status(404).send("Email not found");
  const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: "3m"
  });
  let link = `<a href="http://notifyapp.tk/account/change-pw/${token}">Change Password</a>`;
  let info = await transporter.sendMail({
    from: "notifyapp96@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    html: `<p>Please click on the link below to reset your password</p> <br> ${link}` // html body
  });
  info.messageId ? res.sendStatus(200) : res.sendStatus(400);
});
router.get("/change-pw/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const validate = jwt.verify(token, process.env.TOKEN_SECRET);
    res.render("resetpw", { email: validate.email });
  } catch (err) {
    res.status(400).send("<h4>This link has expired</h4>");
  }
});

router.post(
  "/changed-pw/:email",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const email = req.params.email;
    const body = req.body;
    const schema = Joi.object({
      password: Joi.string().pattern(
        new RegExp("^(?=.*?[A-Z])(?=.*?[a-z]).{5,}$")
      ),
      confirmpassword: Joi.ref("password")
    });
    try {
      const value = await schema.validateAsync(body);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      res.redirect("http://notifyapp.tk");
    } catch (err) {
      res.render("resetpw", {
        error:
          "Password must have at least one upper case, one lower case, must be at least 5 characters and must match the confirm password field"
      });
    }
  }
);
router.post("/changed-pass", async (req, res) => {
  const { email, password, oldpw } = req.body;
  const ExistingUser = await User.findOne({ email: email });
  const comparepass = await bcrypt.compare(oldpw, ExistingUser.password);
  if (!comparepass) return res.status(401).send("Incorrect old password");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  ExistingUser.password = hashedPassword;
  await ExistingUser.save();
  res.status(200).send("Password Changed Successfully");
});
module.exports = router;
