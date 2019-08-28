var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var Airtable = require("airtable");
var usersTable = new Airtable({ apiKey: process.env.API_KEY }).base(
  "appSzrXhoxRLgSrUg"
);

router.get("/signIn", function(req, res) {});

router.get("/signUp", function(req, res) {
  var email = req.body.user.email;
  var pass = bcrypt.hashSync(req.body.user.password);
  var filter = `({Email Address} = "${email}")`;

  usersTable("Users")
    .select({
      filterByFormula: filter
    })
    .eachPage(
      function page(records, fetchNextPage) {
        if (records[0]) {
          res.send("Given Email Has Already Been Used");
        } else {
          usersTable("Users").create(
            {
              "Email Address": email,
              "Password Hash": pass
            },
            function(err, record) {
              if (err) {
                console.error(err);
                res.send("Error");
                return;
              }
              console.log(record.getId());
              res.send("New User Succesfully Created");
            }
          );
        }
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

router.get("/completeQuiz", function(req, res) {});

module.exports = router;
