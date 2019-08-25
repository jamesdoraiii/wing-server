var express = require("express");
var router = express.Router();
var Airtable = require("airtable");
var customersTable = new Airtable({ apiKey: process.env.API_KEY }).base(
  "appvr9t8BUMeGo3oS"
);

router.get("/fetchInitialOnboarding/:email", function(req, res) {
  var filter = `({Email} = "${req.params.email}")`;
  customersTable("Initial Onboarding")
    .select({
      filterByFormula: filter
    })
    .eachPage(
      function page(records) {
        records.forEach(function(record) {
          res.send(record.fields);
        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

router.get("/fetchRelationshipProfile/:email", function(req, res) {
  var filter = `({Email} = "${req.params.email}")`;
  customersTable("Relationship Profile")
    .select({
      filterByFormula: filter
    })
    .eachPage(
      function page(records) {
        records.forEach(function(record) {
          res.send(record.fields);
        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

router.get("/fetchDateNightQuiz/:email", function(req, res) {
  var filter = `({Email} = "${req.params.email}")`;
  customersTable("Date Night Quiz")
    .select({
      filterByFormula: filter
    })
    .eachPage(
      function page(records) {
        records.forEach(function(record) {
          res.send(record.fields);
        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
});

module.exports = router;
