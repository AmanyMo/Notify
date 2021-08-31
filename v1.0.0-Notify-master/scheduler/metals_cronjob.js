const Job = require("cron").CronJob;
const MetalTrack = require("../model/MetalTrack");
const metal = require("../websites/PreciousMetals.js");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "SendGrid",
    auth: {
      user: process.env.sendgrid_id,
      pass: process.env.sendgrid_pw,
    },
  })
);
async function MetalPriceTrack(newMetalTrack, info, req, reqPrice) {
  return new Job(
    "*/2 * * * *",
    async function () {
      const dis = this;

      //starting a new cron job (scheduled task)... something to keep track of the products price
      const pro = await MetalTrack.findOne(newMetalTrack);
      if (pro) {
        //getting old price from db.
        //scrape the link again to find the current price..
        let _Mtl;
        if (pro.metal_type == "Gold") {
          _Mtl = "XAU";
        } else {
          _Mtl == "XAG";
        }
        metal(pro.currency, pro.weight, _Mtl)
          .then((values) => {
            giveresults(values).then((res) => {
              console.log(res);
              console.log(
                `Checked MetalPrice for today for user ${pro.user_id}`
              );
            });
          })
          .catch(() => {});
        function giveresults(res) {
          console.log(`Checking metal price for ${info.userEmail}`);
          return new Promise((resolve, reject) => {
            let currentPrice = res.price;
            let requiredPrice;
            reqPrice
              ? (requiredPrice = reqPrice)
              : (requiredPrice = pro.current_price);
            if (currentPrice < requiredPrice) {
              let email = transporter
                .sendMail({
                  from: "notifyapp96@gmail.com", // sender address
                  to: info.userEmail, // list of receivers
                  subject: `The ${pro.metal_type} price you were tracking in ${pro.currency} has dropped!`, // Subject line
                  html: `<h2>This Price has dropped to ${currentPrice} ${pro.currency} for 1 ${pro.weight}!! </h2><br>
                         <p>Tracking this item has stopped automatically, if you wish to keep tracking please provide the item details in the app again.</p>
                    `, // html body
                })
                .then(() => {
                  dis.stop();
                  console.log(
                    `metals email sent to ${info.userEmail} and stopped tracking the item automatically`
                  );

                  pro.remove().then(() => {
                    req.io.sockets.connected[info.socketid].emit("removeItem", newMetalTrack);
                    req.io.emit('TrackLess');
                    resolve("done");
                  });
                })
                .catch(() => {
                  reject(new Error("failed to send email"));
                });
            } else {
              resolve("no price drop");
            }
          });
        }
      } else {
        dis.stop();
        console.log(
          `stopped cronjob automatically on ${info.userEmail} for metal ${info.name} in ${info.currency}`
        );
      }
    },
    null,
    true
  );
}
module.exports = MetalPriceTrack;
