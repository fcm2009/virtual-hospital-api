var Sequelize = require('sequelize');
var config = require("./config")["local"];

var sequelize = new Sequelize(config.database, config.username, config.password, config);
var models = [
    "User",
    "HealthRecord"
];

module.exports.sequelize = sequelize;
models.forEach(function (model, index, models) {
    module.exports[model] = sequelize.import(model);
    module.exports[model].sync();
});

//relations
module.exports["User"].belongsTo(module.exports["HealthRecord"]);
//end of relations

sequelize.sync();