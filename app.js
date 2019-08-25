require("dotenv").config();
var express = require("express");
var app = express();

var customerInfo = require("./controllers/customerInfoController");

app.use(require("./middleware/headers"));

//var bodyParser = require('body-parser');

//app.use(bodyParser.json());

app.use("/customerInfo", customerInfo);

app.listen(3000, function() {
  console.log("App is listening on 3000.");
});
