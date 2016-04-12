var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require("passport")
var bearerStrategy = require("passport-http-bearer").Strategy
var localStrategy = require("passport-local").Strategy

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


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8080, function() {
  console.log("listening on port 8080")
})

module.exports = app;
