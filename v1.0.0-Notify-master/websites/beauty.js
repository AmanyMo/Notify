const puppeteer = require("puppeteer");
const currency=require('currency.js');
async function mazayastores(link) {
  let product = { name: null, price: null, currency: null, ImgSrc: null };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: "networkidle2" });
  //name
  try {
    await page.waitForSelector(".base", { visible: true,timeout:3000 });
    var name = await page.$eval(".base", (sp) => sp.textContent);
  } catch (error) {
    console.log("error in name");
  }
  // price
  try {
    await page.waitForSelector(".price", { visible: true,timeout:3000 });
    const arr = await page.$eval(".price", (span) =>
      span.textContent.split(" ")
    );
    var cur = arr[0];
    var price = parseFloat(arr[1]);
  } catch (error) {
    console.log("..error during getting price..");
  }
  //img src
  try {
    await page.waitForSelector(".fotorama__img", { visible: true,timeout:3000 });
    var imgsrc = await page.$eval(".fotorama__img", (s) => s.src);
  } catch (error) {
    console.log("error during getting img src");
  }
  product.name = name;
  product.price = price;
  product.currency = cur;
  product.ImgSrc = imgsrc;

  browser.close();
  return product;
}
async function hudabeauty(link){
  let product={name:null,price:null,currency:null,ImgSrc:null};
  const browser=await puppeteer.launch();
  const page=await browser.newPage();

  await page.goto(link,{waitUntil:"networkidle2"});
  //name
  try{
      await page.waitForSelector('.product-name',{visible:true,timeout:3000})
      var name=await page.$eval('.product-name',h=>h.textContent);
  }
  catch(error){
     console.log(' huda error during getting ..name..');
  }
  //price
  try{
      await page.waitForSelector('.value',{visible:true,timeout:3000});
      var strprice=await page.$eval('.value',span=>span.textContent);
      var arr=await page.$eval('.value',span=>span.textContent.split(' '));
    
      var price=currency(strprice).value;
      var currencyy=strprice.replace(/\s|[0-9]|\n/g,'').replace('.','');
      }
  catch(error){
     console.log(' huda error during getting ..price..');
  }
  //img src
  try{
      await page.waitForSelector('.mz-figure',{visible:true,timeout:3000});
      var imgsrc=await page.$eval('.mz-figure',fig=>fig.firstChild.src);
  
  }
  catch(error){
     console.log(' huda error during getting ..img..');
  }
  product.name=name;
  product.price=price;
  product.ImgSrc=imgsrc;
  product.currency=currencyy
await browser.close();
return product;
}
async function anastasiabeverlyhills(link){

  let product={name:null,price:null,currency:null,ImgSrc:null};
  const browser=await puppeteer.launch({defaultViewport:null});
  const page=await browser.newPage();
  await page.goto(link,{waitUntil: 'domcontentloaded'});
  //name
  try{
     await page.waitForSelector('.prod-name-wrap',{visible:true,timeout:3000});
      const str=await page.$eval('.prod-name-wrap',sp=>sp.textContent);
      var name = str.replace(/\n|\r|\t/g, "");
   

  }
  catch(error){
      console.log("anastasia  error in name");
  }
// price
  try{
      await page.waitForSelector('.price-sales',{visible:true,timeout:3000});
      const strprice=await page.$eval('.price-sales',span=>span.textContent.replace(/\n|\t|\r/gm,''));   
      
      var cur=strprice.replace(/[0-9]|\s/g,'').replace('.','');
 
      var price=currency(strprice).value;

     

  }
  catch(error){
      console.log("anastasia..error during getting price.."); 
  }
//img src
  try{
      await page.waitForSelector('.primary-image',{visible:true,timeout:3000});
      var imgsrc=await page.$eval(".primary-image",img=>img.getAttribute('srcset'));
    
  }
  catch(error){
      console.log(" anastasia error during getting img src");
      
  }
  product.name=name;
  product.price=price;
  product.currency=cur;
  product.ImgSrc=imgsrc;
await browser.close();

return product;


}

async function sephora(link){
  let product={name:null,price:null,currency:'$',ImgSrc:null};
  const browser=await puppeteer.launch({headless:true,defaultViewport:null});
  const page=await browser.newPage();
page.setDefaultNavigationTimeout(0);
  await page.goto(link,{waitUntil:'networkidle2'});
  //name
  try{
      await page.waitForSelector('.css-euydo4',{visible:true,timeout:3000})
      var name=await page.$eval('.css-euydo4',h=>h.textContent);
  }
  catch(error){
     console.log('error during getting ..name..');
  }
  //price
  try{
      await page.waitForSelector('.css-slwsq8',{visible:true,timeout:3000});
      const arr=await page.$eval('.css-slwsq8',span=>span.firstChild.textContent)
      var cur=arr.replace(/\s|[0-9]/g,'').replace('.','');
      var price=currency(arr).value;
  }
  catch(error){
     console.log('error during getting ..price..');
  }
  //img src
  try{
      await page.waitForSelector('.css-j3e40p',{visible:true,timeout:3000});
      var imgsrc=await page.$eval('.css-j3e40p',img=>img.src);
  }
  catch(error){
     console.log('error during getting ..img..');
  }
  product.name=name;
  product.price=price;
  product.ImgSrc=imgsrc;
  product.currency=cur;

  
  await browser.close();
  return product;
}
module.exports = {
  mazayastores,
  hudabeauty,
  anastasiabeverlyhills,
  sephora
};
