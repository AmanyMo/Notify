const express = require("express");
const psl = require("psl");
const Websites = require("../model/Websites");
const CurrencyTrack = require("../model/CurrencyTrack");
const MetalTrack = require("../model/MetalTrack");
const CurrencyScheduler = require("../scheduler/currency_cronjob");
const MetalsScheduler = require("../scheduler/metals_cronjob");
const {
  ae,
  lacoste,
  pullandbear,
  zara,
  hm,
  bershka,
} = require("../websites/clothing");
const {
  btech,
  elarabygroup,
  fresh,
  ikea,
  inandoutfurniture,
} = require("../websites/homeapp");
const { amazon, olx, souq, jumia } = require("../websites/ecommerce");
const {
  anastasiabeverlyhills,
  hudabeauty,
  mazayastores,
  sephora,
} = require("../websites/beauty");
const { adidas, nike, puma, reebok } = require("../websites/sports");
const { azzamwatches, gcwatches } = require("../websites/jewlery");
const Currency = require("../websites/Currency");
const metal = require("../websites/PreciousMetals");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const ProductTrack = require("../model/ProductTrack");
const User = require("../model/User");
const Messages=require('../model/messages')
const scheduler = require("../scheduler/cronjobs");
const smtpTransport = require("nodemailer-smtp-transport");
const transporter = nodemailer.createTransport(
  //acquiring nodemailer info ..
  smtpTransport({
    service: "SendGrid",
    auth: {
      user: process.env.sendgrid_id,
      pass: process.env.sendgrid_pw,
    },
  })
);
const router = express.Router();
router.post("/", async (req, res) => {
  //responsible for popup
  const info = req.body;
  
  try {
    var link = new URL(info.link);
    var name = psl.parse(link.hostname);
  } catch {
    
    return res.status(400).send("This is not a valid link");
  }

  eval(`${name.sld}('${link}').then((results)=>{giveresults(results)})`);
  function giveresults(results) {
    let count = 0;
    for (let [key, value] of Object.entries(results)) {
      if (value == null) {
        count++;
      }
    }
    if (count >= 2) {
      return res.status(400).send("The provided link is not a product");
    }

    res.send(results);
    res.end();
  }
});

router.post("/currency", async (req, res) => {
  const { Have, Want } = req.query;
  Currency(Have, Want)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
router.post("/metals", async (req, res) => {
  const { currency, weight, mtl } = req.body;
  metal(currency, weight, mtl)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
router.post("/schedule", async (req, res) => {
  //responsible for all scheduling ..
  //function to start if user wants only any price drop

  /////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  var info = req.body;
  var { _id } = await User.findOne({ email: info.userEmail }); //getting the users id by his email
  let ExistingProductTrack = await ProductTrack.findOne({
    product_link: info.link,
    user_id: _id,
  });
  if (ExistingProductTrack)
    return res.status(400).send("You are already tracking this product"); //checking if the user already tracks this product..
  var newProductTrack = new ProductTrack({
    //assigning a new product to be tracked in the tracking document.
    user_id: _id,
    product_link: info.link,
    product_price: info.price,
    product_name: info.name,
    product_currency: info.currency,
    product_image: info.image,
  });
  await newProductTrack.save();
  req.io.emit('newItem')
  res.sendStatus(200);
  if (info.userRequirement == 0) {
    (await scheduler(newProductTrack, info, req)).start();
  } else {
    (await scheduler(newProductTrack, info, req, info.requestedPrice)).start();
  }
});

router.post("/schedule-currency", async (req, res) => {
  var info = req.body;
  var { _id } = await User.findOne({ email: info.userEmail }); //getting the users id by his email
  let ExistingCurrencyTrack = await CurrencyTrack.findOne({
    user_id: _id,
    from_currency: info.from_currency,
    to_currency: info.to_currency,
  });
  if (ExistingCurrencyTrack)
    return res
      .status(400)
      .send("You are already tracking this Currency Change"); //checking if the user already tracks this currency..
  var newCurrencyTrack = new CurrencyTrack({
    user_id: _id,
    from_currency: info.from_currency,
    to_currency: info.to_currency,
    current_price: info.price,
  });
  await newCurrencyTrack.save();
  req.io.emit('newItem')
  res.sendStatus(200);
  if (info.userRequirement == 0) {
    (await CurrencyScheduler(newCurrencyTrack, info,req)).start();
  } else {
    (
      await CurrencyScheduler(newCurrencyTrack, info,req, info.requestedPrice)
    ).start();
  }
});
router.post("/schedule-metals", async (req, res) => {
  var info = req.body;
  var { _id } = await User.findOne({ email: info.userEmail }); //getting the users id by his email
  let ExistingMetal = await MetalTrack.findOne({
    user_id: _id,
    metal_type: info.name,
    weight: info.weight,
    currency: info.currency,
  });
  if (ExistingMetal)
    return res.status(400).send("You are already tracking this Request"); //checking if the user already tracks this currency..
  var newMetalTrack = new MetalTrack({
    user_id: _id,
    weight: info.weight,
    currency: info.currency,
    current_price: info.price,
    metal_type: info.name,
  });
  await newMetalTrack.save();
  req.io.emit('newItem')
  res.sendStatus(200);
  if (info.userRequirement == 0) {
    (await MetalsScheduler(newMetalTrack,req, info)).start();
  } else {
    (await MetalsScheduler(newMetalTrack, info,req, info.requestedPrice)).start();
  }
});
router.get("/getall/:email", async (req, res) => {
  //getting all the tracked products by a specific user........
  const email = req.params.email;
  const { _id } = await User.findOne({ email: email });
  const allProducts = await ProductTrack.find({ user_id: _id });
  res.status(200).send(allProducts);
});
router.get("/getallcurr/:email", async (req, res) => {
  //getting all the tracked products by a specific user........
  const email = req.params.email;
  const { _id } = await User.findOne({ email: email });
  const allCurrencies = await CurrencyTrack.find({ user_id: _id });
  res.status(200).send(allCurrencies);
});
router.get("/getallmetals/:email", async (req, res) => {
  //getting all the tracked products by a specific user........
  const email = req.params.email;
  const { _id } = await User.findOne({ email: email });
  const allmetals = await MetalTrack.find({ user_id: _id });
  res.status(200).send(allmetals);
});
router.delete("/delete/:id", async (req, res) => {
  //canceling a schedule
  const id = req.params.id;
  let currencyitemMaybe = await CurrencyTrack.findOne({ _id: id });
  if (currencyitemMaybe) {
    await currencyitemMaybe.remove();
  } else {
    let metalitemmaybe = await MetalTrack.findOne({ _id: id });
    if (metalitemmaybe) {
      await metalitemmaybe.remove();
    } else {
      await ProductTrack.deleteOne({ _id: id });
    }
  }
  res.status(200).send("stopped tracking successfully!");
});
router.get('/getmessages/:email',async(req,res)=>{
const email=req.params.email;
const messages=await Messages.find({userEmail:email});

  res.status(200).send(messages);


});
module.exports = router;
