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
this.HealthRecord.belongsTo(this.MedicalHistory);
//end of relations

this.User.sync({force: true});
this.HealthRecord.sync({force: true});
this.MedicalHistory.sync({force: true});
//sequelize.sync({force: true});
