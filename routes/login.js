var express = require('express');
var router = express.Router();
var passport = require("passport")
var hat = require("hat")
var healthRecord = require("../models/HealthRecord")

router.post("/", passport.authenticate("local", { session: false}), function(req, res) {
  healthRecord.findOrCreate({
    where: {
      id: 5
    }
  }).then(function(){
    console.log("ok");
  }).catch(function(error) {
    console.log(error);
  })
  res.send(hat(1024, 32))
})

module.exports = router;
