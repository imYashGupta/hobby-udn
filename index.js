/* import express from "express";
import axios from "axios";
import fs from "fs";
import qs from "qs"; */

const express = require('express');

const cors = require('cors');
const {scrapper} = require("./scrapper");
const {scrapperYashGupta} = require("./scrapper-yashgupta");
const {zenrows} = require("./zenrows");

const app = express();
/* app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); */

const PORT = process.env.PORT || 5000;
 

app.get('/scrapper', (req, res) => {
  scrapper(res);
});

app.get("/yashgupta",(req,res) => {
  scrapperYashGupta(res);

});

app.get("/zenrows",(req,res) => {
  zenrows(res);

});

// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});