var express = require('express');
var router = express.Router();
var passport = require("passport");
var multer = require("multer");
var upload = multer({dest: "./uploads"}).any();
var models = require("../app").get("models");

//TODO: enable auth
//TODO: finalize method
router.post("/document", passport.authenticate("bearer", { session: false }), function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            //TODO: log
            res.status(403);
            res.send("File Uploaded Failed, Try Again");
        } else {
            var user = req.user;
            var medicalHistory = models.MedicalHistory;

            req.files.forEach(function (file, index, files) {
                user.healthRecord.medicalHistory.add(medicalHistory.build({
                    fileName: file.originalname,
                    path: file.path
                }));
            });
            user.save().then(function () {
                res.status(200);
                res.send("File Uploaded Successfully");
            }).error(function (error) {
                //TODO:log
            });
        }
    });
});

module.exports = router;
