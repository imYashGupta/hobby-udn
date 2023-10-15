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

  axios.get('https://corsproxy.org/?https://udaan.com/api/foodFmcgSearch/v1/listing/TLFRC4BJF4F42RCQ6CGBMFB347WBRY8', {
    headers: {
      Authorization: 'Bearer eyJraWQiOiI2TW53IiwidHlwIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJhdWQiOiJodHRwczovL2FwaS51ZGFhbi5jb20vIiwic3ViIjoiVVNSMExKVjRENFcwVERSQjRNTlpINjZISDlaTDAiLCJyIjpbInVzZXIiXSwibmJmIjoxNjk3MzkzMTEwLCJpc3MiOiJhdXRoLnVkYWFuLmNvbSIsImV4cCI6MTY5NzM5MzcxMCwibyI6Ik9SRzFCOEVIRkpLMkZDN0RGS0xMUjJFOENaTkYwIn0.NsCTVdNRz_ie5JNCACG_IHy9-6Ey4GZ2gE-gJVdzKcUM2JhDWS2SI6ikOmcz0_Sy42KBWBtNyayQ1kIe9mNoXg'
    }
}).then(function (response) {
    // handle success
    console.log(response);
    res.json(response.data)
}).catch(e => {
  console.log(e);
  res.send(e.data);
})

 
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));

 
