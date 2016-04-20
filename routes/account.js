var express = require("express");
var router = express.Router();
var passport = require("passport");
var models = require("../app").get("models");
var hat = require("hat");


router.post("/view", passport.authenticate("bearer", { session: false }), function(req, res) {
    var user = req.user;
    res.send({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber
    });
});

router.post("/create", function(req, res) {
    var input = req.body;

    if(!input.username || !input.email || !input.password
        || !input.age || !input.height || !input.weight) {
        res.status(400);
        res.send("Required Field Messing");
        return;
    }

    models.User.findOrCreate({
        where: {
            $or: {
                username: input.username,
                email: input.email
            }
        },
        defaults: {
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            mobileNumber: input.mobileNumber,
            //TODO:hash password
            passwordHash: input.password,
            HealthRecord: {
                age: input.age,
                height: input.height,
                weight: input.weight,
                chronicDiseases: input.chronicDiseases
            }
        },
        include: models.HealthRecord
    }).spread(function (user, isCreated) {
        if(!isCreated) {
            if(user.username === input.username) {
                res.status(409);
                res.send("Username Already Exist")
            } else {
                res.status(409);
                res.send("Email Already Exist")
            }
        } else {
            res.status(200);
            res.send("Account Created Successfully");
        }
    }).error(function (error) {
        //TODO: log
    })
});

router.post("/update", passport.authenticate("bearer", {session: false}), function(req, res) {
    var input = req.body;
    var user = req.user;
    user.update({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        mobileNumber: input.mobileNumber,
        isEmailConfirmed: false
    }).then(function() {
        res.status(200);
        res.send("User Information Has Been Updated Successfully")
    }).error(function(error) {})
});

router.post("/login", passport.authenticate("local", { session: false}), function(req, res) {
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

module.exports = router;
