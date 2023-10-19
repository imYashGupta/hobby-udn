const puppeteer = require("puppeteer-extra");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("dotenv").config();
const pluginStealth = require("puppeteer-extra-plugin-stealth"); 
const { executablePath } = require("puppeteer"); 
puppeteer.use(pluginStealth()); 




const scrapperYashGupta = async (res) => {
  puppeteer.launch({ executablePath: executablePath() }).then(async browser => { 
    // Create a new page 
    const page = await browser.newPage(); 
   
    // Setting page view 
    await page.setViewport({ width: 1280, height: 720 }); 
   
    // Go to the website 
    await page.goto('https://udaan.yashgupta.work/app.html');

    // Wait for the data to be present after the AJAX call
    await page.waitForFunction(() => {
      return document.body.textContent.trim().startsWith('{');
    });
  
    // Extract the data from the page
    const data = await page.evaluate(() => {
      return JSON.parse(document.body.textContent);
    });
   
    console.log(data);
   
    // Close the browser 
    await browser.close(); 
  });

 
}

module.exports = { scrapperYashGupta };