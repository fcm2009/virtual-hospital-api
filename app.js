var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require("passport");
var bearerStrategy = require("passport-http-bearer").Strategy;
var localStrategy = require("passport-local").Strategy;

var app = express();
module.exports = app;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/account", require('./routes/account'));
app.use("/login", require('./routes/login'));

app.set("models", require("./models/index"));

passport.use("bearer", new bearerStrategy(
  function(access_token, done) {
    //TODO: implement user authenticate
    return done(null, true, { scope: "all" });
  }));

passport.use("local", new localStrategy(
  function(username, password, done) {
    //TODO: implement
    return done(null, true);
  }));

app.listen(8080, function() {
  console.log("listening on port 8080");
});