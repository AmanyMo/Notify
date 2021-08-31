const puppeteer = require("puppeteer");
const currency = require("currency.js");
let nike = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, price, curr;
  await page.goto(link, { waitUntil: "networkidle2" });
  try {
    await page.waitForSelector("h1#pdp_product_title", { visible: true ,timeout:3000});
    name = await page.$eval("h1#pdp_product_title", (prod) => prod.textContent);
  } catch {}
  try {
    await page.waitForSelector("picture>img",{timeout:3000});
    imgSrc = await page.$eval("picture>img", (img) => img.getAttribute("src"));
  } catch {}
  try {
    await page.waitForSelector(".headline-5 div", { visible: true,timeout:3000 });
    price = await page.$eval(".headline-5 div", (price) => price.textContent);
    curr = price.replace(/[0-9]|\s/g, "").replace(".", "");
    price = currency(price).value;
  } catch {}

  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: curr,
  };
};
let adidas = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
  const chromeUserAgent = headlessUserAgent.replace("HeadlessChrome", "Chrome");
  await page.setUserAgent(chromeUserAgent);
  await page.goto(link, { waitUntil: "networkidle2" });
  let name;
  let pricestring;
  let price;
  let ImgTag;
  let ImgSplit;
  let ImgSrc;
  let curr;
  try {
    await page.waitForSelector(".gl-heading.gl-heading--regular",{timeout:3000 });
    name = await page.$eval(
      ".gl-heading.gl-heading--regular",
      (name) => name.textContent
    );
  } catch (error) {}
  try {
    await page.waitForSelector(".gl-price__value",{timeout:3000 });
    pricestring = await page.$eval(
      ".gl-price__value",
      (price) => price.textContent
    );
    price = currency(pricestring).value;
  } catch (error) {}
  try {
    await page.waitForSelector(".view___2-z-q img",{timeout:3000 });
    ImgTag = await page.$eval(".view___2-z-q img", (img) =>
      img.getAttribute("srcset")
    );
    ImgSplit = ImgTag.split(" ");
    ImgSrc = ImgSplit[0];
  } catch (error) {}
  try {
    curr = pricestring.replace(/[0-9]/g, "").replace(".", "");
  } catch (error) {}
  await browser.close();
  return {
    name: name,
    price: price,
    ImgSrc: ImgSrc,
    currency: curr,
  };
};
let puma = async (link) => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: "networkidle2" });
  let name;
  let pricestring;
  let price;
  let ImgSrc;
  try {
    await page.waitForSelector(".product-name",{timeout:3000 });
    name = await page.$eval(".product-name", (name) => name.textContent);
  } catch (error) {}
  try {
    await page.waitForSelector(".value",{timeout:3000 });
    pricestring = await page.$eval(".value", (price) => price.textContent);
    price = currency(pricestring).value;
  } catch (error) {}

  try {
    curr = pricestring.replace(/[0-9]/g, "").replace(".", "");
  } catch (error) {}
  await browser.close();
  return {
    name: name,
    price: price,
    currency: curr,
  };
};
let reebok = (async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
  const chromeUserAgent = headlessUserAgent.replace("HeadlessChrome", "Chrome");
  await page.setUserAgent(chromeUserAgent);
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: 'networkidle2' });
  let name;
  let pricestring;
  let price;
  let ImgTag;
  let ImgSplit;
  let ImgSrc;
  let curr;
  try {
    await page.waitForSelector('.gl-heading',{timeout:3000 })
    name = await page.$eval('.gl-heading', name => name.textContent);
  }
  catch (error) {
  }
  try {
    await page.waitForSelector('.gl-price__value',{timeout:3000 });
    pricestring = await page.$eval('.gl-price__value', price => price.textContent)
    price=currency(pricestring).value
  }
  catch (error) {
  }
  try {
    await page.waitForSelector('.view___2-z-q img',{timeout:3000 });
    ImgTag= await page.$eval('.view___2-z-q img', img => img.getAttribute('srcset'));
    ImgSplit=ImgTag.split(' ');
    ImgSrc=ImgSplit[0];
  }
  catch (error) {
  }
  try {
    curr = pricestring.replace(/[0-9]/g, '').replace('.','');
  }
  catch (error) {

  }
  await browser.close();
  return {
    name: name,
    price: price,
    ImgSrc: ImgSrc,
    currency:curr
  }
});
module.exports = {
  nike,
  adidas,
  puma,
  reebok
};
