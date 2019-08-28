require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var customerInfo = require("./controllers/customerInfoController");
var user = require("./controllers/userController");

app.use(require("./middleware/headers"));

//var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use("/user", user);
app.use("/customer", customerInfo);

app.listen(3000, function() {
  console.log("App is listening on 3000.");
});
