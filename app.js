var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require("passport");
var bearerStrategy = require("passport-http-bearer").Strategy;
var localStrategy = require("passport-local").Strategy;
var multer = require("multer");

var app = express();
module.exports = app;
app.set("models", require("./models/index"));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/account", require('./routes/account'));
app.use("/appointment", require('./routes/appointment'));
app.use("/medicalHistory", require('./routes/medicalHistory'));

passport.use("bearer", new bearerStrategy(function(access_token, done) {
    app.get("models").User.findOne({
        where: {
            //TODO: hash token
            tokenHash: access_token
        }
    }).then(function (user) {
        return done(null, user)
    }).error(function (error) {
        //TODO: log
    })
}));
passport.use("local", new localStrategy(function (username, password, done) {
    app.get("models").User.findOne({
        where: {
            username: username,
            //TODO: hash password
            passwordHash: password
        }
    }).then(function (user) {
        return done(null, user)
    }).error(function (error) {
        //TODO: log
    })
}));

app.set('views', "./tests/");
app.set('view engine', 'jade');
app.get('/', function(req, res){
    res.render('uploadTest');
});

app.listen(8080, function() {
  console.log("Listening on Port 8080");
});
