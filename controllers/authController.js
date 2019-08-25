var express = require("express");
var router = express.Router();
var Airtable = require("airtable");
var customersTable = new Airtable({ apiKey: process.env.API_KEY }).base(
  "appvr9t8BUMeGo3oS"
);

module.exports = router;
