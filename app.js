var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require("passport")
var bearerStrategy = require("passport-http-bearer").Strategy
var localStrategy = require("passport-local").Strategy
var Sequelize = require('sequelize');

var sequelize = new Sequelize('mssql://SWE418-VH:VH\@20155@virtualhospital.datab\
ase.windows.net:1433/virtualhospitalDB')

module.exports.sequelize = sequelize

var account = require('./routes/account');
var login = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use("/account", account)
app.use("/login", login)

passport.use("bearer", new bearerStrategy(
  function(access_token, done) {
    //TODO: implement user authenticate
    return done(null, true, { scope: "all" })
  }))

passport.use("local", new localStrategy(
  function(username, password, done) {
    //TODO: implement
    return done(null, true)
  }))

app.listen(8080, function() {
  console.log("listening on port 8080")
})
