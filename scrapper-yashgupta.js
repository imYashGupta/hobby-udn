const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("dotenv").config();
 



const scrapperYashGupta = async (res) => {
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
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();

     // Navigate to the page with the AJAX request
  await page.goto('https://udaan.yashgupta.work/app.html');

  // Wait for the data to be present after the AJAX call
  await page.waitForFunction(() => {
    return document.body.textContent.trim().startsWith('{');
  });

  // Extract the data from the page
  const data = await page.evaluate(() => {
    return JSON.parse(document.body.textContent);
  });

  // Print the extracted data
  console.log(data);

  // Close the browser
  await browser.close();
}

module.exports = { scrapperYashGupta };