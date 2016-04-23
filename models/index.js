var Sequelize = require('sequelize');
var config = require("./config");

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var models = [
    "User",
    "HealthRecord",
    "MedicalHistory",
    "Appointment",
    "Doctor",
    "Slot"
];

models.forEach(function (model, index, models) {
    module.exports[model] = sequelize.import(model);
});

//status
this.CANCELLED = 0;
this.PENDING = 1;
this.CONFIRMED = 2;

this.AVAILABLE = 0;
this.BOOKED = 1;
//status

//relations
this.User.belongsTo(this.HealthRecord);
this.HealthRecord.hasMany(this.MedicalHistory);

this.Doctor.hasMany(this.Slot);

this.Appointment.belongsTo(this.User);
this.Appointment.belongsTo(this.Slot);
//end of relations

sequelize.sync();
