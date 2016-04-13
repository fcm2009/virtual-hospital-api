var express = require('express');
var router = express.Router();
var passport = require("passport");
var hat = require("hat");
var app = require("../app");

router.post("/", passport.authenticate("local", { session: false}), function(req, res) {
    res.send(hat(1024, 23))
});

module.exports = router;