const puppeteer=require('puppeteer');
const currency=require('currency.js');
let i = async (link) => {
    let available;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    let name, imgSrc, priceString, price;
    await page.goto(link,{waitUntil:"networkidle2"});
    
    try{
      await page.waitForSelector('.product-single__vendor', {
        visible: true,
        timeout:3000
      });
      name = await page.$eval(
          '.product-single__vendor',
        prod => prod.textContent.replace(/\n/g,'').replace(/\s/g,'')
      );
    const title = await page.$eval(
        '.product-single__title',
      prod => prod.textContent.replace(/\n/g,'').replace(/\s/g,'')
    );
  name=`${name} ${title}`;
    }
   catch{}
  try{
    await page.waitForSelector('.product-image-main img',{timeout:3000});
    imgSrc = await page.$eval('.product-image-main img', img =>
      img.getAttribute("data-photoswipe-src")
    );
    imgSrc=`http:${imgSrc}`;
  }
  catch{}
  try{
    await page.waitForSelector('.product__price', {
      visible: true,
      timeout:3000
    });
    priceString = await page.$eval(
      '.product__price',
      span => span.textContent
    );
    const elementsale=await page.$x("//span[contains(@class,'product__price sale-price')]");
    if(elementsale.length>0){
      priceString=await page.evaluate(element=>element.textContent,elementsale[0])
    }
    price = currency(priceString).value;
    
  
  }
  catch{
  }
      await browser.close();
  
      return {
        name: name,
        ImgSrc: imgSrc,
        price: price,
        currency:'LE'
      };
    
  };
let azzamwatches = (async (linkUrl) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(linkUrl, { waitUntil: 'networkidle2' });// ,makesure everything is loaded
    let name;
    let CurrPrice;
    let Price;
    let ImgSrc;
  
    try {
      await page.waitForSelector(".product-name", { visible: true,timeout:3000 });
      name = await page.$eval('.product-name', span => span.textContent);
    }
    catch (error) {
    }
    try {
      await page.waitForSelector(".product-price__price span", { visible: true,timeout:3000 });
      CurrPrice = (await page.$eval('.product-price__price span', span => span.textContent))
      Price = currency(CurrPrice).value;
    }
    catch (error) {
  
     }
    try {
      await page.waitForSelector('.product-single__photo-image',{timeout:3000});
      ImgSrc = await page.$eval('.product-single__photo-image', img => img.getAttribute('src'));
      ImgSrc=`http:${ImgSrc}`;
    }
    catch (error) {
  
    }
    await browser.close();
    return {
      name: name,
      price: Price,
      ImgSrc: ImgSrc,
      currency:'EGP'
    }
  });
let gcwatches = (async (linkUrl) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(linkUrl, { waitUntil: 'networkidle2' });// ,makesure everything is loade
    let name;
    let CurrPrice;
    let Price;
    let ImgSrc;
    let curr;
    try {
      await page.waitForSelector(".product-name", { visible: true,timeout:3000 });
      name = await page.$eval('.product-name', span => span.textContent);
    }
    catch (error) {
    }
    try {
      await page.waitForSelector(".price-sales", { visible: true,timeout:3000 });
      CurrPrice = (await page.$eval('.price-sales', span => span.textContent))
      Price = currency(CurrPrice).value;
    }
    catch (error) {
  
    }
    try {
      await page.waitForSelector('.productthumbnail',{timeout:3000});
      ImgSrc = await page.$eval('.productthumbnail', img => img.getAttribute('src'));
    }
    catch (error) {
    }
    try {
      curr = CurrPrice.replace(/[0-9]/g, '').replace('.','');
    }
    catch (error) {
  
    }
    await browser.close();
    return {
      name: name,
      price: Price,
      ImgSrc: ImgSrc,
      currency: curr
    }
  });

  module.exports={
      i,
      azzamwatches,
      gcwatches
      
  }