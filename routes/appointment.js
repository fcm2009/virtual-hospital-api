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
                    return slot.id == req.body.slotId;
                });
                userSlot = userSlot[0]; //only one slot can have the id the user provided, this depackage it
                if(userSlot) {
                    if(userSlot.status == models.AVAILABLE) {
                        models.Appointment.create({
                            status: models.Appointment.PENDING,
                            UserId: req.user.id,
                            SlotId: userSlot.id
                        }).then(function (appointment) {
                            models.Appointment.findOne({
                                where: {
                                    id: appointment.id
                                },
                                include: [models.Slot]
                            }).then(function (appointment) {
                                userSlot.status = models.BOOKED;
                                userSlot.save();
                                res.send(appointment);
                            });
                        });
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

router.post("/cancel", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Appointment.findOne({
        where: {
            id: req.body.appointmentId
        }
    }).then(function (appointment) {
        if(appointment) {
            appointment.destroy();
            res.status(200);
            res.send("Appointment Deleted Successfully");
        } else {
            res.status(404);
            res.send("Appointment is not Found");
        }
    }).error(function (error) {
        //TODO:log
    });
});

router.post("/listSlots", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Doctor.findAll({
        where: {
            id: req.body.doctorId
        }
    }).spread(function (doctor) {
        if(doctor) {
            doctor.getSlots().then(function (slots) {
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

router.post("/list", passport.authenticate("bearer", {session: false}), function (req, res) {
    models.Appointment.findAll({
        where: {
            UserId: req.user.id
        },
        include: [models.Slot]
    }).then(function (appointments) {
        res.send(appointments)
    }).error(function (error) {
        //TODO:log
    })
});


module.exports = router;