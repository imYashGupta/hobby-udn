// const puppeteer = require("puppeteer");
require("dotenv").config();
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    headless:'new',
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  console.log(process.env.NODE_ENV === "production"
  ? process.env.PUPPETEER_EXECUTABLE_PATH
  : puppeteer.executablePath(),process.env.NODE_ENV === "production"
  ? true
  : false);
  try {
    const page = await browser.newPage();
    const response =  await page.goto('https://www.flipkart.com/crocs-bayaband-clog-sgy-lip-men-grey-clogs/p/itm6291240db1809?pid=SNDG978FJMFJV6Y4&lid=LSTSNDG978FJMFJV6Y4J3SDKK&marketplace=FLIPKART&q=crocs&store=osp&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=1912b1fd-3f5a-4885-a51d-59f5dacdb348.SNDG978FJMFJV6Y4.SEARCH&ppt=sp&ppn=sp&qH=288311fdda8a29ae',{waitUntil:'domcontentloaded'});

    const responseBody = await response.text();
    
    res.send(responseBody);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };