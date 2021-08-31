const Job = require("cron").CronJob;
const CurrencyTrack = require("../model/CurrencyTrack");
const Currency = require("../websites/Currency");
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
async function CurrencyPriceTrack(newCurrencyTrack, info, req, reqPrice) {
  return new Job(
    "*/2 * * * *",
    async function () {
      const dis = this;

      //starting a new cron job (scheduled task)... something to keep track of the products price
      const pro = await CurrencyTrack.findOne(newCurrencyTrack);
      if (pro) {
        //getting old price from db.
        //scrape the link again to find the current price..
        Currency(pro.from_currency, pro.to_currency)
          .then((values) => {
            giveresults(values).then((res) => {
              console.log(res);
              console.log(`Checked currency for today for user ${pro.user_id}`);
            });
          })
          .catch(() => {});
        function giveresults(res) {
          console.log(`Checking currency for ${info.userEmail}`);
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
                  subject: `The Currency rate from ${info.from_currency} to ${info.to_currency} has dropped!`, // Subject line
                  html: `<h2>This Rate has dropped to ${currentPrice} ${info.from_currency} for 1 ${info.to_currency}!! </h2><br>
                     <p>Tracking this item has stopped automatically, if you wish to keep tracking this item please provide the details in the app again.</p> `, // html body
                })
                .then(() => {
                  dis.stop();
                  console.log(
                    `currency email sent to ${info.userEmail} and stopped cronjob automatically`
                  );

                  pro.remove().then(() => {
                    req.io.sockets.connected[info.socketid].emit(
                      "removeItem",
                      newCurrencyTrack
                    );
                    req.io.emit("TrackLess");
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
          `stopped cronjob automatically on ${info.userEmail} for currency ${info.from_currency} to ${info.to_currency}`
        );
      }
    },
    null,
    true
  );
}
module.exports = CurrencyPriceTrack;
