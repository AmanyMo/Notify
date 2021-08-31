const Job = require("cron").CronJob;
const psl = require("psl");
const messages=require('../model/messages');
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const SMS=require('../twilio')
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "SendGrid",
    auth: {
      user: process.env.sendgrid_id,
      pass: process.env.sendgrid_pw
    }
  })
);
const ProductTrack = require("../model/ProductTrack");
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
const {
  azzamwatches,
  gcwatches,
  iwatchstores,
} = require("../websites/jewlery");
async function AnyPriceTrack(newProductTrack, info, req, reqPrice) {
  return new Job(
    "*/2 * * * *",
    async function () {
      const dis = this;

      //starting a new cron job (scheduled task)... something to keep track of the products price
      const pro= await ProductTrack.findOne(newProductTrack);
      if (pro) {
        //getting old price from db.
        //scrape the link again to find the current price..
        const link = new URL(info.link);
        const name = psl.parse(link.hostname); //parsing link to get name of host..
        eval(
          `${name.sld}('${link}').then((results)=>{giveresults(results).then(()=>{console.log('Checked Product For Today')}).catch(()=>{console.log('error')})})`
        );
        function giveresults(res) {
          console.log(`Checking Product for ${info.userEmail}`);
          return new Promise((resolve, reject) => {
            let currentPrice = res.price; //price of today
            let requiredPrice;
            reqPrice
              ? (requiredPrice = reqPrice)
              : (requiredPrice = pro.product_price);
            if (currentPrice < 5000) {
              SMS(`DISCOUNT ON ${info.name},This Product has dropped to ${currentPrice} ${info.currency}!! `)
              let email = transporter
                .sendMail({
                  from: "notifyapp96@gmail.com", // sender address
                  to: info.userEmail, // list of receivers
                  subject: `DISCOUNT ON ${info.name}`, // Subject line
                  html: `<h2>This Product has dropped to ${currentPrice} ${info.currency}!! </h2><br>
                  To Purchase visit ${link}`, // html body
                })
                .then(async () => {
               
                  console.log(`email sent to ${info.userEmail}`);
                  dis.stop();
                  pro.remove().then(() => {
                    req.io.sockets.connected[info.socketid].emit("removeItem", newProductTrack);
                    req.io.emit('TrackLess');
                    resolve("done");
                  });
                })
                .catch(async () => {
               
                  reject(new Error("failed to send email"));
                });
            } else {
              resolve("no price drop");
            }
          });
        }
      }
      else
      {
      
        dis.stop();
        console.log(`stopped cronjob automatically on ${info.userEmail} for product ${info.name}`)
      }
    },
    null,
    true
  );
}

module.exports = AnyPriceTrack;
