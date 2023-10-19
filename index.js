/* import express from "express";
import axios from "axios";
import fs from "fs";
import qs from "qs"; */

const fs = require('fs');
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');
const {scrapper} = require("./scrapper");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
 

app.get('/scrapper', (req, res) => {
  scrapper(res);
});

// Start the Express.js server
app.listen(PORT);
