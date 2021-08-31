const puppeteer = require("puppeteer");
const currency = require("currency.js");
let fresh = async (link) => {
  let available;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currencyy;
  await page.goto(link, { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector('div[class^="ProductDetails"]> header>h1', {
      visible: true,
      timeout:3000
    });
    name = await page.$eval(
      'div[class^="ProductDetails"]> header>h1',
      (prod) => prod.textContent
    );
  } catch {}
  try {
    await page.waitForSelector("#product-image",{timeout:3000});
    imgSrc = await page.$eval("#product-image", (img) =>
      img.getAttribute("href")
    );
  } catch {}
  try {
    await page.waitForSelector('div[class^="ProductDetails"]> div>span', {
      visible: true,
      timeout:3000
    });
    priceString = await page.$eval(
      'div[class^="ProductDetails"]> div>span',
      (span) => span.textContent
    );
    price = currency(priceString).value;
    currencyy = priceString.replace(/[0-9]|\s|\n/g, "").replace(".", "");
  } catch {}

  let availabillity = await page.$x("//div[text()='Out of Stock']");
  if (availabillity.length > 0) available = "Out of Stock";
  else available = "In stock";

  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    availabillity: available,
    currency: currencyy,
  };
};
let btech = async (link) => {
  let available;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currencyy;

  await page.goto(link, { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector("h1.product__info__title", { visible: true,timeout:3000 });
    name = await page.$eval(
      "h1.product__info__title",
      (prod) => prod.textContent
    );
    
  } catch {}
  try {
    await page.waitForSelector(".fotorama__loaded--img",{timeout:3000});
    imgSrc = await page.$eval(".fotorama__loaded--img>img", (img) =>
      img.getAttribute("src")
    );
  } catch {}
  try {
    await page.waitForSelector(".price", { visible: true,timeout:3000 });
    priceString = await page.$eval(".price", (span) => span.textContent);
    price = currency(priceString).value;
    
  
  } catch {}
  try {
    let availabillity = await page.$x("//p[contains(@class,'out-stock')]");
    if (availabillity.length > 0) available = "Out of Stock";
    else available = "In stock";
  } catch {}

  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    availabillity: available,
    currency: 'EGP',
  };
};

let elarabygroup = async (link) => {
  let available;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currencyy;
  await page.goto(link, { waitUntil: "networkidle2" });
  try {
    await page.waitForSelector(".product-name>h1", { visible: true });
    name = await page.$eval(".product-name>h1", (prod) => prod.textContent);
  } catch {}
  try {
    await page.waitForSelector(".etalage_source_image");
    imgSrc = await page.$eval(".etalage_source_image", (img) =>
      img.getAttribute("src")
    );
  } catch {}
  try {
    await page.waitForSelector(".product-shop.col-sm-6 .price", {
      visible: true,
    });
    priceString = await page.$eval(
      ".product-shop.col-sm-6 .price",
      (span) => span.textContent
    );
    const checkIfOld = await page.$eval(
      ".product-shop.col-sm-6 .price",
      (div) => div.id
    );

    if (checkIfOld.includes("old-price")) {
      priceString = await page.$eval(
        'span[id^="product-price"]',
        (p) => p.textContent
      );
    }
    price = currency(priceString).value;
    currencyy = priceString.replace(/[0-9]|\s|\n/g, "").replace(".", "").replace(',',"");
  } catch {}

  let availabillity = await page.$x("//p[contains(@class,'out-of-stock')]");
  if (availabillity.length > 0) available = "Not Available Online";
  else available = "In stock";

  await browser.close();
console.log(name,imgSrc,price);
  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    availabillity: available,
    currency: currencyy,
  };
};
let ikea = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.emulateTimezone(0);
  await page.goto(link, { waitUntil: "networkidle2" });
  let name;
  let Pricestring;
  let price;
  let ImgSrc;
  let curr;

  try {
    await page.waitForSelector(".product-pip__name",{timeout:3000});
    name = await page.$eval(".product-pip__name", (name) => name.textContent);
  } catch (err) {}
  try {
    await page.waitForSelector(".product-pip__price__value",{timeout:3000});
    Pricestring = await page.$eval(
      ".product-pip__price__value",
      (price) => price.textContent
    );
    price = currency(Pricestring).value;
  } catch (err) {}
  try {
    await page.waitForSelector(".range-carousel__image",{timeout:3000});
    ImgSrc = await page.$eval(".range-carousel__image>img", (src) =>
      src.getAttribute("src")
    );
  } catch (err) {}
  try {
    curr = Pricestring.replace(/[0-9]|\s/g, "")
      .replace(".", "")
      .replace(",", "");
  } catch (error) {}

  await browser.close();
  return {
    name: name,
    price: price,
    ImgSrc: ImgSrc,
    currency: curr,
  };
};
let inandoutfurniture = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto(link, { waitUntil: "networkidle2" });
  let name;
  let Pricestring;
  let price;
  let ImgSrc;
  let curr;

  try {
    await page.waitForSelector(".product-info h1",{timeout:3000});
    name = await page.$eval(".product-info h1", (name) => name.textContent);
  } catch {}
  try {
    await page.waitForSelector(".price",{timeout:3000});
    Pricestring = await page.$eval(".price>span", (p) => p.textContent);
    curr = Pricestring.replace(/[0-9]|\s/g, "")
      .replace(".", "")
      .replace(",", "");
    newPricestring = await page.$eval(".price", (p) => p.textContent);
    newPricestring = newPricestring.replace(Pricestring, "");
    price = currency(newPricestring).value;
  } catch {}

  try {
    await page.waitForSelector(".img-screen img",{timeout:3000});
    ImgSrc = await page.$eval(".img-screen img", (img) =>
      img.getAttribute("src")
    );
  } catch {}

  await browser.close();
  return {
    name: name,
    price: price,
    ImgSrc: ImgSrc,
    currency: curr,
  };
};
module.exports = {
  fresh,
  btech,
  elarabygroup,
  ikea,
  inandoutfurniture
};
