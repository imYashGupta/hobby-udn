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

app.get('/', (req, res) => {

  let url = 'https://corsproxy.io/?https%3A%2F%2Fudaan.com%2Fapi%2FfoodFmcgSearch%2Fv1%2Flisting%2FTLFRC4BJF4F42RCQ6CGBMFB347WBRY8=';

  let options = {method: 'GET'};
  
  fetch('https://api.scraperapi.com/?api_key=b7fe6fcbc069576c789172a800bbf76f&url=https%3A%2F%2Fudaan.com%2Fapi%2FfoodFmcgSearch%2Fv1%2Flisting%2FTLFRC4BJF4F42RCQ6CGBMFB347WBRY8')
  .then(response => {
    console.log(response)
    res.json(response)
  })
  .catch(error => {
    console.log(error)
    res.json(error)

  });

 
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));

 
