var express = require("express");
var router = express.Router();
var passport = require("passport");


router.post("/", passport.authenticate("bearer", { session: false }), function(req, res) {
  //TODO: implment create account
  res.send("account")
});

module.exports = router;
