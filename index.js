import fetch from 'node-fetch';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import qs from 'qs';
import { createProxyMiddleware } from 'http-proxy-middleware';



const app = express();
const port = 5000;

let token = null;
let tokenExpirationTime = null;

app.get('/udaan', (req, res) => {
  console.log("req rec");

  axios.get('https://app.scrapingbee.com/api/v1', {
    params: {
        'api_key': 'PHSQVQ8M31S98WS6LZJ36Z7SBXG8Z5BZFR41KD15EOHQGXKYJMVNKTD1MKQB5CETFL12QSKW5GOC0ZYD',
        'url': 'https://udaan.com/api/foodFmcgSearch/v1/listing/TLFRC4BJF4F42RCQ6CGBMFB347WBRY8',  
        'premium_proxy': 'true',
        'stealth_proxy': 'true', 
        'country_code':'in'
    } 
}).then(function (response) {
    // handle success
    console.log(response);
    res.send(response.data)
}).catch(e => {
  console.log(e);
  res.send(e.data);
})

 
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));

 
