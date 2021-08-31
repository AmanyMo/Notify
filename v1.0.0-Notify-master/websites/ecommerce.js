const puppeteer = require("puppeteer");
const currency = require("currency.js");

async function amazon(link) {
  let product = {
    name: null,
    price: null,
    currency: null,
    ImgSrc: null,
  };
  var finalprice, curr;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
  const chromeUserAgent = headlessUserAgent.replace("HeadlessChrome", "Chrome");
  await page.setUserAgent(chromeUserAgent);
  page.setDefaultNavigationTimeout(0);
  const url = link;
  await page.goto(url, { waitUntil: "networkidle2" });
  //name
  try {
    await page.waitForSelector("#productTitle",{timeout:3000});
    var str = await page.$eval("#productTitle", (span) => span.textContent);
    var name = str.replace(/\n|\r|\t|\s/g, "");
  } catch (error) {
    
  }
  //price
  try {
    try {
      await page.waitForSelector("#priceblock_ourprice", { visible: true ,timeout:3000});

      finalprice = await page.$eval(
        "#priceblock_ourprice",
        (span) => span.textContent
      );
    } catch {
      finalprice = await page.$eval(
        "#priceblock_dealprice",
        (span) => span.textContent
      );
  
    }
    var price = currency(finalprice).value;
    curr = finalprice
      .replace(/[0-9]|\s|\n/g, "")
      .replace(",", "")
      .replace(".", "");
  } catch (error) {
    
  }

  try {
    await page.waitForSelector("#landingImage", { visible: true,timeout:3000 });
    var imgSrc = await page.$eval("#landingImage", (img) =>
      img.getAttribute("src")
    );
  } catch (error) {
    
  }
  product.name = name;
  product.price = price;
  product.currency = curr;
  product.ImgSrc = imgSrc;
  await browser.close();

  return product;
}
async function olx(link) {
  let product = { name: null, price: null, currency: "EGP", ImgSrc: null };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  //to read arabic character
  await page.setExtraHTTPHeaders({ "Accept-Language": "eg" });
  ////////////
  await page.goto(link, { waitUntil: "networkidle2" });
  //name
  try {
    await page.waitForSelector(".brkword", { visible: true ,timeout:3000});
    var str = await page.$eval(".brkword", (h) => h.textContent);
    var name = str.replace(/\n|\r|\t/g, "");
  } catch (error) {
    
  }
  // price
  try {
    await page.waitForSelector(".xxxx-large", { visible: true ,timeout:3000});
    const arr = await page.$eval(".xxxx-large", (span) =>
      span.textContent.split(" ")
    );
    var cur = arr[1];
    var price = arr[0];
  } catch (error) {
    
  }
  //img src
  try {
    await page.waitForSelector(".bigImage", { visible: true ,timeout:3000});
    var imgsrc = await page.$eval(".bigImage", (s) => s.src);
  } catch (error) {
    
  }
  product.name = name;
  product.price = price;
  product.currency = cur;
  product.ImgSrc = imgsrc;
  await browser.close();
  return product;
}
async function jumia (link)  {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto(link,{waitUntil:'networkidle2'});
  let name;
  let Pricestring;
  let price;
  let ImgSrc;
  let curr;
   try {
       await page.waitForSelector('.-fs0.-pls.-prl h1',{timeout:3000})
       name=await page.$eval('.-fs0.-pls.-prl h1',name=>name.textContent);    
   }
   catch (error) {
   }
   try {
       await page.waitForSelector('.-b.-ltr.-tal.-fs24',{timeout:3000})
       Pricestring=await page.$eval('.-b.-ltr.-tal.-fs24',price=>price.textContent);
       price=currency(Pricestring).value;
   }
   catch (error) {
   }
     try{
       await page.waitForSelector('.-fw.-fh',{timeout:3000})
       ImgSrc=await page.$eval('.-fw.-fh',img=>img.getAttribute('src'));
     }
     catch(error){

     }
     try {
      curr = Pricestring.replace(/[0-9]/g, '').replace('.','');
    }
    catch (error) {
    }
     await browser.close();

  return {
      name: name,
      price:price,
      ImgSrc:ImgSrc,
      currency: 'EGP'

  }

};
async function souq (link)  {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto(link,{waitUntil:'networkidle2'});
  let name;
  let Pricestring;
  let price;
  let ImgSrc ;

   try {
      await page.waitForSelector('.small-12.columns.product-title h1',{timeout:3000});
      name=await page.$eval('.small-12.columns.product-title h1',name=>name.textContent)
   }
   catch (error) {
   }
   try {
       await page.waitForSelector('.price.is.sk-clr1',{timeout:3000})
       Pricestring=await page.$eval('.price.is.sk-clr1',price=>price.textContent);
       price=currency(Pricestring).value;
   }
   catch (error) {
   }
     try{
       await page.waitForSelector('.img-bucket img',{timeout:3000})
       ImgSrc=await page.$eval('.img-bucket img',img=>img.getAttribute('src'));
     }
     catch(error){
     }
  await browser.close();
  return {
      name: name,
      price:price,
      ImgSrc:ImgSrc,
      currency:"EGP"

  }

};
module.exports = {
  amazon,
  olx,
  jumia,
  souq
};
