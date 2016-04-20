var express = require('express');
var router = express.Router();
var passport = require("passport");
var models = require("../app").get("models");


router.post("/make", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Doctor.findOne({
        where: {
            id: req.body.doctorId
        }
    }).then(function (doctor) {
        if(doctor) {
            doctor.getSlots().then(function (slots) {
                var userSlot = slots.filter(function (slot) {
                    return slot.getId === req.body.id;
                });
                userSlot = userSlot[0]; //only one slot can have the id the user provided, this depackge it
                if(userSlot) {
                    if(userSlot.isAvailable === models.AVAILABLE) {
                        models.Appointment.create({
                            status: models.Appointment.PENDING,
                            UserId: req.user.id,
                            SlotId: userSlot.id
                        }).then(function (appointment) {
                            res.send(appointment);
                        })
                    } else {
                        res.status(400);
                        res.send("Time Slot is not Available")
                    }
                } else {
                    res.status(404);
                    res.send("Time Slot is not found");
                }
            });
        } else {
            res.status(404);
            res.send("Doctor is not Found");
        }
    }).error(function (error) {
        //TODO:log
    });
});

router.post("/cancel", passport.authenticate("bearer", {session: false}, function (req, res) {
    models.Appointment.findOne({
        where: {
            id: req.body.appointmentId
        }
    }).then(function (appointment) {
        if(appointmentId) {
            models.destroy(appointment);
            res.status(200);
            res.status("Appointment Deleted Successfully");
        } else {
            res.status(404);
            res.status("Appointment is not Found");
        }
    }).error(function (error) {
        //TODO:log
    });
}));

router.post("/listSlots", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Doctor.findAll({
        where: {
            id: req.body.id
        }
    }).spread(function (doctor) {
        if(doctor) {
            doctor.getSlot().then(function (slots) {
                res.send(slots);
            });
        } else {
            res.status(404);
            res.send("Doctor Not Found")
        }
    }).error(function (error) {
        //TODO:log
    })
});

router.post("/listDoctors", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Doctor.findAll().then(function (doctors) {
        res.send(doctors);
    }).error(function (error) {
        //TODO:log
    })
});

router.post("/listAppointments", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Appointment.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(function (appointments) {
        res.send(appointments)
    }).error(function (error) {
        //TODO:log
    })
});


module.exports = router;