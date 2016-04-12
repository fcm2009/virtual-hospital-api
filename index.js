var express = require("express")
var app = express()
var passport = require("passport")
var bearerStrategy = require("passport-http-bearer").Strategy
var localStrategy = require("passport-local").Strategy
var account = require("./account")
var login = require("./login")
var BodyParser = require('body-parser').urlencoded({ extended: true })
