const puppeteer = require("puppeteer");
const currency = require("currency.js");
//uses USD
let ae = async (link) => {
  let available;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let name, imgSrc, priceString, price;
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector(".product-name", {
      visible: true,
      timeout:3000
    });
    name = await page.$eval(".product-name", (prod) =>
      prod.textContent.replace(/\n/g, "").trim()
    );
  } catch {}
  try {
    await page.waitForSelector("picture>img",{timeout:3000});
    imgSrc = await page.$eval("picture>img", (img) => img.getAttribute("src"));
  } catch {}
  try {
    await page.waitForSelector(".product-list-price", {
      visible: true,
      timeout:3000
    });
    checkIfOld = await page.$eval(".product-list-price", (span) =>
      span.getAttribute("class")
    );
    if (checkIfOld.includes("product-list-price-without-sale")) {
      priceString = await page.$eval(
        ".product-list-price",
        (span) => span.textContent
      );
    } else {
      priceString = await page.$eval(
        ".product-sale-price",
        (span) => span.textContent
      );
    }
    price = currency(priceString).value;
  } catch {}
  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: "$",
  };
};

let pullandbear = async (link) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  let name, imgSrc, priceString, price, currencyy;
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: "networkidle0" });

  try {
    await page.waitForSelector("#titleProductCard", {
      visible: true,
      timeout:3000
    });
    name = await page.$eval("#titleProductCard", (prod) => prod.textContent);
  } catch {}
  try {
    await page.waitForSelector(".price span", {
      visible: true,
      timeout:3000
    });
    priceString = await page.$eval(".price>span", (span) => span.textContent);
    let checkIfOld = await page.$eval(".price", (div) =>
      div.getAttribute("class")
    );

    if (checkIfOld.includes("price-old")) {
      priceString = await page.$eval(".sale>span", (span) => span.textContent);
    }
    price = currency(priceString).value;
    currencyy = priceString.replace(/[0-9]|\s|\n/g, "").replace(".", "");
  } catch {}
  try {
    await page.waitForSelector("figure>img",{timeout:3000});
    imgSrc = await page.evaluate(() => {
      let x = document.querySelector("figure>img");
      return x.getAttribute("src");
    });
  } catch {}

  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: currencyy,
  };
};
let lacoste = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currencyy;
  await page.goto(link, { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector(".js-pdp-desc>h1", {
      visible: true,
      timeout:3000
    });
    name = await page.$eval(".js-pdp-desc>h1", (prod) =>
      prod.textContent.replace(/\n/g, "")
    );
  } catch {}
  try {
    await page.waitForSelector(".pict>img",{timeout:3000});
    imgSrc = await page.$eval(".pict>img", (img) => img.getAttribute("src"));
  } catch {}
  try {
    await page.waitForSelector(".js-pdp-price>p", {
      visible: true,
      timeout:3000
    });
    priceString = await page.$eval(
      ".js-pdp-price>p",
      (span) => span.textContent
    );
    price = currency(priceString).value;
    currencyy = priceString.replace(/[0-9]|\s|\n/g, "").replace(".", "");
  } catch {}
  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: currencyy,
  };
};
let zara = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currencyy;
  await page.goto(link, { waitUntil: "networkidle2" });
  try {
    await page.waitForSelector("h1.product-name", { visible: true ,timeout:3000});
    name = await page.$eval("h1.product-name", (prod) => prod.textContent);
  } catch {}
  try {
    await page.waitForSelector("#main-images>div>a",{timeout:3000});
    imgSrc = await page.$eval("#main-images>div>a", (img) =>
      img.getAttribute("href")
    );
  } catch {}
  try {
   
    const original_price = await page.
    $x("//span[@class='main-price']");

    if (original_price.length > 0) {
      priceString = await page.evaluate(
        (element) => element.textContent,
        original_price[0]
      );
    }

    const checkIfOld = await page.$x("//span[contains(@class,'sale')]");
    if (checkIfOld.length > 0) {
      
      const element = checkIfOld[0];
      priceString = await page.evaluate(
        (element) => element.textContent,
        element
      );
    }
    price = currency(priceString).value;
    
    currencyy = priceString.replace(/[0-9]|\s|\n/g, "").replace(".", "");
  } catch {}

  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: currencyy,
  };
};
let hm = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  let name, imgSrc, priceString, price, currency;
  await page.goto(link, { waitUntil: "networkidle2" });
  try {
    await page.waitForSelector("h1", { visible: true ,timeout:3000});
    name = await page.$eval("h1", (prod) =>
      prod.textContent.replace(/\n/g, "")
    );
  } catch {}
  try {
    await page.waitForSelector("figure>img",{timeout:3000});
    imgSrc = await page.$eval("figure>img", (img) => img.getAttribute("src"));
  } catch {}
  try {
    await page.waitForSelector(".price-amount",{timeout:3000});
    price = await page.$eval(".price-amount", (price) => price.textContent);
    currency = await page.$eval(
      ".price-currency",
      (price) => price.textContent
    );
  } catch {}
  try {
    await page.waitForSelector(".special--price .price-amount", {
      timeout: 5000,
    });
    price = await page.$eval(
      ".special--price .price-amount",
      (price) => price.textContent
    );
  } catch {}
  await browser.close();

  return {
    name: name,
    ImgSrc: imgSrc,
    price: price,
    currency: currency,
  };
};
let bershka = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: "networkidle2" });
  let name;
  let pricestring;
  let price;
  let ImgSrc;

  let curr;
  try {
    await page.waitForSelector(".product-description-name");
    name = await page.$eval(
      ".product-description-name",
      (name) => name.textContent
    );
  } catch (error) {}
  try {
    await page.waitForSelector(".productPrice");
    pricestring = await page.$eval(".productPrice", (price) =>
      price.getAttribute("class")
    );
    if (pricestring.includes("oldPrice")) {
      pricestring = await page.$eval(
        "span.productPrice.newPrice",
        (price) => price.textContent
      );
    } else {
      pricestring = await page.$eval(
        ".productPrice",
        (price) => price.textContent
      );
    }

    price = currency(pricestring).value;
  } catch (error) {}
  try {
    await page.waitForSelector(".product-image-image img");
    ImgSrc = await page.$eval(".product-image-image img", (img) =>
      img.getAttribute("src")
    );
  } catch (error) {}
  try {
    curr = pricestring.replace(/[0-9]|\s/g, "").replace(".", "");
  } catch (error) {}

  await browser.close();
  return {
    name: name,
    price: price,
    ImgSrc: ImgSrc,
    currency: curr,
  };
};
module.exports = {
  ae,
  pullandbear,
  lacoste,
  zara,
  hm,
  bershka
};
