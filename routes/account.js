var express = require("express");
var router = express.Router();
var passport = require("passport");
var models = require("../app").get("models");


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

    if(!input.email || !input.username || !input.password) {
        res.status(400);
        res.send("Required Field Messing");
        return;
    }

    models.User.find({
        where: {
            $or: {
                username: input.username,
                email: input.email
            }
        }
    }).then(function (user) {
        if(user) {
            if(user.username === input.username) {
                res.status(409);
                res.send("Username Already Exist")
            } else {
                res.status(409);
                res.send("Email Already Exist")
            }
        } else {
            models.User.create({
                    username: input.username,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    mobileNumber: input.mobileNumber,
                    //TODO:hash password
                    passwordHash: input.password
            }).then(function (user) {
                user.setHealthRecord({
                    age: input.age,
                    height: input.height,
                    weight: input.weight,
                    chronicDiseases: input.chronicDiseases
                })
            });

            res.status(200);
            res.send("Account Created Successfully")
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

module.exports = router;
