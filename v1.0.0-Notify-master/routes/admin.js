const express = require("express");
const router = express.Router();
const User = require("../model/User");
const CurrencyTrack = require("../model/CurrencyTrack");
const MetalTrack = require("../model/MetalTrack");
const ProductTrack = require("../model/ProductTrack");
const Feedback=require('../model/feedback')
router.get("/users", async (req, res) => {
  const users = await User.countDocuments();
  res.status(202).send(users.toString());

});

router.get("/items", async (req, res) => {
  let currencycount = await CurrencyTrack.countDocuments();
  let metalcount = await MetalTrack.countDocuments();
  let productcount = await ProductTrack.countDocuments();
  let total = currencycount + metalcount + productcount;
  res.status(202).send(total.toString());
});

router.post('/morefeatures',async(req,res)=>{
const {email,name,msg,rating}=req.query
let feedback=new Feedback({
  userEmail:email,
  userName:name,
  rating,
  feedback:msg
});
await feedback.save();
req.io.emit('newFeedback',feedback)
res.sendStatus(200)
});

router.get('/getfeatures',async(req,res)=>{
let all=await Feedback.find();
res.status(200).send(all)
});
module.exports = router;
