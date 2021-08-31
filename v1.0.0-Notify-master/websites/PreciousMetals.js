const currency = require("currency.js");
const puppeteer = require("puppeteer");

let metal = async (_Curr, _Wgt,_Mtl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const linkUrl = "https://goldprice.org/";
  page.setDefaultNavigationTimeout(0);
  await page.goto(linkUrl, { waitUntil: "networkidle2" }); // ,makesure everything is loaded
  try{
    await page.waitForSelector('#gpxtickerLeft_met');
    x = await page.$eval('#gpxtickerLeft_met', metal => metal.value);
    y=await page.select('#gpxtickerLeft_met',_Mtl)
  }

  catch(error)
  {}

  try {
    var Curr = await page.select("select#gpxtickerLeft_curr", _Curr);
    await Curr.select(_Curr);
  } catch (err) {}

  try {
    var Wgt = await page.select("select#gpxtickerLeft_wgt-au", _Wgt);
    await Wgt.select(_Wgt);
  } catch (err) {}

  try {
    await page.goto(linkUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector("#gpxtickerLeft_price");
    var SelectedPrice = await page.$eval(
      "#gpxtickerLeft_price",
      (span) => span.textContent
    );
  } catch (err) {}
  await browser.close();
  return {
    name: _Mtl=='XAU'?'Gold':'Silver',
    price: currency(SelectedPrice).value,
    currency: Curr[0],
    weight: Wgt[0],
  };
};

module.exports=metal
