var express = require('express');
var router = express.Router();
var passport = require("passport");
var hat = require("hat");
var models = require("../app").get("models");

router.post("/", passport.authenticate("local", { session: false}), function(req, res) {
    //TODO:hash token
    var token = hat(1024, 32);
    req.user.update({
        tokenHash: token
    }).then(function () {
        res.send(token)
    }).error(function (error) {
        //TODO: log
    })
});

//TODO: add email login

module.exports = router;