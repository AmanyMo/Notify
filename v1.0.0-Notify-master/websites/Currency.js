const puppeteer = require('puppeteer');
const oanda = (async (Have, Want) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const link = 'https://www1.oanda.com/currency/converter/'
  page.setDefaultNavigationTimeout(0);
  await page.goto(link, { waitUntil: 'networkidle2' });

  let currhave;
  let y;
  let currwant;
  let x;
  let i;
  let price;


  try {
    await page.waitForSelector('#quote_currency_input')
    currhave = await page.$('#quote_currency_input');
    await currhave.type(Have);
    await page.waitForSelector('.ltr_list_item.list_item_hover')
    y = await page.$('.ltr_list_item.list_item_hover')
    await y.click();

  }
  catch (error) {
  }
  try {
    await page.waitForSelector('#base_currency_input')
    currwant = await page.$('#base_currency_input');
    await currwant.type(Want);
    await page.waitForSelector('.ltr_list_item.list_item_hover')
    x = await page.$('.ltr_list_item.list_item_hover')
    await x.click();
  }
  catch (error) { }

  try {

    await page.waitForSelector('#base_amount_input')
    await page.waitFor(1000);
    i = await page.$eval('#base_amount_input', price => price.value);
    price = await parseFloat(i);
  }
  catch (error) { }
  await browser.close();
  return {
    price: price,
  }
});
module.exports=oanda