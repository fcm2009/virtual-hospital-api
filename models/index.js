var Sequelize = require('sequelize');
var config = require("./config")["local"];

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
    module.exports.model = sequelize.import(model);
});
//TOFO: fix this and chceck avaliblity and cancel
this.model.CANCELLED = 0;
this.model.PENDING = 1;
this.model.CONFIRMED = 3;

this.model.BOOKED = 0;
this.model.AVAILABLE = 1;

//relations
this.User.belongsTo(this.HealthRecord);
this.HealthRecord.hasMany(this.MedicalHistory);

this.Doctor.hasMany(this.Slot);

this.Appointment.belongsTo(this.User);
this.Appointment.belongsTo(this.Slot);
//end of relations

sequelize.sync();
