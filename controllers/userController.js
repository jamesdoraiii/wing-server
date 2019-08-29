var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var Airtable = require("airtable");
var usersTable = new Airtable({ apiKey: process.env.API_KEY }).base(
  "appSzrXhoxRLgSrUg"
);

router.get("/signIn", function(req, res) {
  var email = req.body.user.email;
  var pass = req.body.user.password;
  var filter = `({Email Address} = "${email}")`;
  usersTable("Users")
    .select({
      filterByFormula: filter
    })
    .eachPage(
      function page(records, fetchNextPage) {
        if (records[0]) {
          // res.send(records[0].fields.passwordHash);
          bcrypt.compare(pass, records[0].fields.passwordHash, function(
            err,
            matches
          ) {
            if (matches) {
              var token = jwt.sign({ id: email }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.send(token);
            } else {
              res.send("password did not match");
            }
          });
        } else {
          res.send("No account found matching this email");
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
              var token = jwt.sign({ id: email }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.send(token);
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
