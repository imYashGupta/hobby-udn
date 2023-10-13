const fs = require('fs');
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 5000;

let token = null;
let tokenExpirationTime = null;
//http://localhost:5000/product?id=TLFSRZE6X0NP8FXQDJZC58VJ5LWQNM9
// Function to read the access token from a file
app.use('/proxy', createProxyMiddleware({ target: 'https://api.udaan.com', changeOrigin: true }));



function readAccessToken() {
    
    try {
      const accessToken = fs.readFileSync('access_token.txt', 'utf8');
      if (accessToken.trim() !== '') {
        let fileData = JSON.parse(accessToken);
        token = fileData.token;
        tokenExpirationTime = fileData.expirationTime;
        console.log('Access token loaded:', fileData);
      } else {
        console.log('Access token file is found empty. getting a new token');
        getAccessToken();
      }
    } catch (error) {
      console.error('Error reading access token:', error);
    }
  }

// Function to write the access token to a file
function writeAccessToken() {
  try {
    const data = JSON.stringify({ token, expirationTime: tokenExpirationTime });
    fs.writeFileSync('access_token.txt', data, 'utf8');
    console.log('Access token saved to file:', token);
  } catch (error) {
    console.error('Error writing access token:', error);
  }
}

// Function to make the initial request to get the access token
function getAccessToken() {
  const options = {
    method: 'POST',
    url: 'https://auth.udaan.com/app/v1/refresh',
    params: { cid: 'udaan-v2' },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'host': 'auth.udaan.com',
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Specify allowed HTTP methods
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // Specify allowed headers
      'Referers': 'udaan.com', // Specify allowed headers
    },
    data: qs.stringify({
      rt: 'URdtZXYYz3EBACAWQghQu7Em9S3e8wtngzq7F4LEhcseKCN/kfvk6k2ErF3LWQ32VZD8Gc9xJCQzVDFXX1n2tpsXzMvK3h3EhmhuqiUkdBH7C6wpV23WkddPWSu4cnQjsruRy/S/bi+uxHEpdwkTSiQICxwNPShQ24m00jAc7Yq12W8XMd9hOTFmMzY2Nw=='
    })
  };

  return axios.request(options)
    .then(function (response) {
      token = response.data.accessToken;
      const expiresIn = response.data.expiresIn;
      tokenExpirationTime = Date.now() + (expiresIn * 1000); // Convert expiresIn to milliseconds and set the token expiration time
      console.log('Access token obtained:', token);
      console.log('Token expiration time:', new Date(tokenExpirationTime));
      writeAccessToken(); // Save the access token to a file
    })
    .catch(function (error) {
      console.error('Error getting access token:', error);
    });
}

// Function to make the request to get the product details
function getProductDetails(prodID) {
  return refreshTokenIfNeeded()
    .then(() => {
      console.log("my token", token); // Log the token after it has been obtained
      const options = {
        method: 'GET',
        url: 'https://api.udaan.com/api/foodFmcgSearch/v1/listing/'+prodID,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return axios.request(options)
        .then(function (response) {
        //   console.log('Product details:', response.data);
          return response.data; // Return the product details
        })
        .catch(function (error) {
          console.error('Error getting product details:', error);
          throw error; // Throw the error to be caught later
        });
    });
}

// Function to check if the token has expired
function isTokenExpired() {
  return tokenExpirationTime && Date.now() >= tokenExpirationTime;
}

// Function to refresh the token if it has expired
function refreshTokenIfNeeded() {
  if (isTokenExpired()) {
    console.log('Token expired, refreshing...');
    return getAccessToken();
  } else {
    console.log('Token still valid, no need to refresh.');
    return Promise.resolve(); // Return a resolved promise if the token is still valid
  }
}

// Load the access token from file when the code starts
readAccessToken();

// Express.js route to handle the request
/* app.get('/product', (req, res) => {
    let prodID = req.query.id;
  refreshTokenIfNeeded()
    .then(getProductDetails)
    .then((productDetails) => {
      res.json({ productDetails }); // Send the product details as a JSON response
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    });
}); */

app.get('/product', (req, res) => {
    const productID = req.query.id; // Get the product ID from the query parameter
    console.log(token)
    if (!productID) {
      res.status(400).send('Product ID is missing');
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://api.udaan.com/api/foodFmcgSearch/v1/listing/'+productID,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.request(options)
      .then(function (response) {
      //   console.log('Product details:', response.data);
      res.json({token:token,data:response.data}); // Return the product details
      })
      .catch(function (error) {
        console.error('Error getting product details:', error);
        res.json(error); // Throw the error to be caught later
      });
  
    /* refreshTokenIfNeeded()
      .then(() => getProductDetails(productID))
      .then((productDetails) => {
        res.json({ productDetails }); // Send the product details as a JSON response
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
      }); */
  });

// Start the Express.js server
app.listen(port);
