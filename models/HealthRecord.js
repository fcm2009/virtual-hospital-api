var sequelize = require('../app').sequelize;
var Sequelize = require('sequelize');

HealthRecord = sequelize.define('HealthRecords', {
  id: {
    type: Sequelize.STRING,
    field: "HealthRecordId",
    primaryKey: true
  },
  age: {
    type: Sequelize.INTEGER,
    field: "Age"
  },
  height: {
    type: Sequelize.INTEGER,
    field: "Height"
  },
  weight: {
    type: Sequelize.INTEGER,
    field: "Weight"
  },
  medicalHistory: {
    type: Sequelize.STRING,
    field: "MedicalHistory"
  },
  ChronicDiseases: {
    type: Sequelize.STRING,
    field: "ChronicDiseases"
  }
})

HealthRecord.sync().then(function() {
  console.log("ok");
}).catch(function(error) {
  console.log(error);
})

module.exports = HealthRecord
