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
app.use('/api', createProxyMiddleware({ target: 'https://api.udaan.com', changeOrigin: true }));


app.listen(port, () => console.log(`Proxy server running on port ${port}`));

 
