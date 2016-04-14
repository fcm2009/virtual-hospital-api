var express = require("express");
var router = express.Router();
var passport = require("passport");
var models = require("../app").get("models");


router.post("/view", passport.authenticate("bearer", { session: false }), function(req, res) {
    models.User.findOne({
        where: {
            tokenHash: req.user.tokenHash
        }
    }).then(function (user) {
        if(user) {
            res.send({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber
            })
        } else {
            res.status(404);
            res.send("Account Is Not Found");
        }
    })
});

router.post("/create", function(req, res) {
    if(!req.body.email || !req.body.username || !req.body.password) {
        res.status(400);
        res.send("Required Field Messing");
        return
    }
    
    models.User.findOrCreate({
        where: {
            $or: {
                username: req.body.username,
                email: req.body.email
            }
        },
        defaults: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            //TODO:hash password
            passwordHash: req.body.password
        }
    }).spread(function (user, isCreated) {
        if(!isCreated) {
            if(user.username === req.body.username) {
                res.status(409);
                res.send("Username Already Exist")
            } else {
                res.status(409);
                res.send("Email Already Exist")
            }
        } else {
            res.status(200);
            res.send("Account Created Successfully")
        }
    }).error(function (error) {
        //TODO: log
    })
});

module.exports = router;
