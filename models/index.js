var Sequelize = require('sequelize');
var config = require("./config")["local"];

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var models = [
    "User",
    "HealthRecord",
    "MedicalHistory"
];

models.forEach(function (model, index, models) {
    module.exports[model] = sequelize.import(model);
});

//relations
this.User.belongsTo(this.HealthRecord);
this.HealthRecord.hasMany(this.MedicalHistory);
//end of relations

sequelize.sync();
