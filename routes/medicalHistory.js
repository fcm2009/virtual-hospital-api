var express = require('express');
var router = express.Router();
var passport = require("passport");
var multer = require("multer");
var upload = multer({dest: "./uploads"}).any();
var models = require("../app").get("models");
var path = require("path");
var fs = require("fs");

//TODO: change any to file and set filename
router.post("/upload", passport.authenticate("bearer", { session: false }), function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            //TODO: log
            res.status(403);
            res.send("File Uploaded Failed, Try Again");
        } else if(!req.files) {
            res.status(400);
            res.send("No File Uploaded");
            return;
        } else {
            var user = req.user;
            req.files.forEach(function (file, index, files) {
                user.getHealthRecord().then(function (healthRecord) {
                    healthRecord.createMedicalHistory({
                        title: file.originalname,
                        fileName: file.filename,
                        path: file.path
                    }).error(function (error) {
                        //TODO:log
                        res.status(503);
                        res.send("File(s) Could not be Added to The Database, Try Again");
                        return;
                    })
                });
            });
            res.status(200);
            res.send("File Uploaded Successfully");
        }
    });
});

router.post("/list", passport.authenticate("bearer", {session: false}), function (req, res) {
    req.user.getHealthRecord().then(function(healthRecord) {
        healthRecord.getMedicalHistories().then(function (medicalHistories) {
            var ids = [];
            medicalHistories.forEach(function(medicalHistory) {
                ids.push(medicalHistory.id);
            });
            res.send(ids);
        });
    });
});

router.post("/getById", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.MedicalHistory.findAll({
        attributes: ["path"],
        where: {
            id: req.body.id
        }
    }).spread(function (medicalHistory) {
        if(medicalHistory) {
            res.sendFile(path.normalize(__dirname.toString() + "/../" + medicalHistory.path));
        } else {
            res.status(404);
            res.send("Medical Record is not Found");
        }
    })
});

router.post("/removeById", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.MedicalHistory.findOne({
        where: {
            id: req.body.id
        },
    }).then(function (medicalHistory) {
        if(medicalHistory) {
            models.MedicalHistory.destroy({
                where: {
                    id: req.body.id
                },
                paranoid: true
            }).then(function () {
                fs.unlink(path.normalize(__dirname.toString() + "/../" + medicalHistory.path), function (error) {
                    if(error) {
                        //TODO:log
                        res.status(404);
                        res.send(error.message);
                    } else {
                        res.status(200);
                        res.send("Medical Record has been Deleted Successfully");
                    }
                });
            });
        } else {
            res.status(404);
            res.send("Medical Record is not Found");
        }
    })
});

module.exports = router;
