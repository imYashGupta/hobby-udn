const pup = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("dotenv").config();
const puppeteer = require("puppeteer-extra"); 
const pluginStealth = require("puppeteer-extra-plugin-stealth"); 


puppeteer.use(pluginStealth()); 

const scrapper = async (res) => {
    // Create browser instance, and give it a first tab
    const browser = await puppeteer.launch({
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
          "--disable-web-security",
          "--disable-features=IsolateOrigins",
          "--disable-site-isolation-trials"
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : pup.executablePath(),
      });
    const page = await browser.newPage();

    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var data = {
            'method': 'GET',
            // 'postData': 'paramFoo=valueBar&paramThis=valueThat'
            headers: {
                Authorization: 'Bearer eyJraWQiOiI2TW53IiwidHlwIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJhdWQiOiJodHRwczovL2FwaS51ZGFhbi5jb20vIiwic3ViIjoiVVNSMExKVjRENFcwVERSQjRNTlpINjZISDlaTDAiLCJyIjpbInVzZXIiXSwibmJmIjoxNjk3NzA4NDgyLCJpc3MiOiJhdXRoLnVkYWFuLmNvbSIsImV4cCI6MTY5NzcwOTA4MiwibyI6Ik9SRzFCOEVIRkpLMkZDN0RGS0xMUjJFOENaTkYwIn0.KhMR_jXkyy7H_itjCYHW6dxgFi0hvZfOVobqWUZWu-JQxANMgh1H8CQ0NU-OmPpcrd6LZWXI08KWIM09AhFELA'
              }
        };

        // Request modified... finish sending! 
        interceptedRequest.continue(data);
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto('https://corsproxy.org/?https://udaan.com/api/foodFmcgSearch/v1/listing/TLFRC4BJF4F42RCQ6CGBMFB347WBRY8');
    const responseBody = await response.json();
    console.log(responseBody);

    // Close the browser - done! 
    await browser.close();
    res.send(responseBody);
    //   await browser.close();
}

module.exports = { scrapper };