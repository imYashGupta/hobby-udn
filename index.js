const express = require('express');
const app = express();
const puppeteer = require("puppeteer");
// const puppeteer = require('puppeteer-extra')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin())
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const { scrapeLogic } = require("./scrapeLogic");

app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ message: "Product ID missing" });
  }


  // try {
    const browser = await puppeteer.launch({ 
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (reqs) => {
      if(reqs.resourceType() === 'image'){
          reqs.abort();
      }
      else {
          reqs.continue();
      }
    });
    // Navigate to the first page
    const response =await page.goto('https://reqres.in/api/users?page=2', { waitUntil: 'domcontentloaded' });

    // Wait for 2 seconds (changed from 5 seconds for faster demonstration)
    // await page.waitForTimeout(2000);

    // Now navigate to the desired URL
    // const response = await page.goto('https://www.myntra.com/gateway/v2/product/'+productId);
    const responseBody = await response.json();

    // Check if the response is successful (status code 200)
    if (!response.ok()) {
      await browser.close();
      res.status(500).json({ error: responseBody.message,code:responseBody.code });
      // throw new Error(`Request failed with status ${response.status()}`);

    }

    // Parse the response body as JSON
    // const responseBody = await response.json();
    // console.log(responseBody);

    // Close the browser when done
    await browser.close();
    // Send the response
    res.send(responseBody);


});

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

 
// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});