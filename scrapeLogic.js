// const puppeteer = require("puppeteer");
require("dotenv").config();
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    headless:true,
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
  try {
    const page = await browser.newPage();
    await page.goto('https://www.myntra.com/',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(2000);
    const response = await page.goto('https://www.myntra.com/gateway/v2/product/16354886');
    console.error(response);

    const responseBody = await response.json();
    
    res.send(responseBody);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };