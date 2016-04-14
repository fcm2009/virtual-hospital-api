var express = require('express');
var router = express.Router();
var passport = require("passport");
var multer = require("multer");
var upload = multer({dest: "./uploads"}).single("MedicalHistory");

//TODO: enable auth
//TODO: finalize method
router.post("/document", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            //TODO: log
        }
    });
    console.log(req.file);
    res.status(200);
    res.send("File Uploaded Successfully");
});

module.exports = router;
