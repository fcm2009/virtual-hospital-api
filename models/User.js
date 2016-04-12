var sequelize = require('../app').sequelize;
var Sequelize = require('sequelize');
var HealthRecord = require("./HealthRecord")

var user = sequelize.define('dbo.User', {
  id: {
    type: Sequelize.STRING,
    field: "Id",
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: "FirstName"
  },
  lastName: {
    type: Sequelize.STRING,
    field: "LastName"
  },
  mobileNumber: {
    type: Sequelize.STRING,
    field: "MobileNumber"
  },
  email: {
    type: Sequelize.STRING,
    field: "Email"
  },
  isEmailConfirmed: {
    type: Sequelize.BOOLEAN,
    field: "EmailConfirmed"
  },
  passwordHash: {
    type: Sequelize.STRING,
    field: "PasswordHash"
  },
  securityStamp: {
    type: Sequelize.STRING,
    field: "SecurityStamp"
  },
  phoneNumber: {
    type: Sequelize.STRING,
    field: "PhoneNumber"
  },
  phoneNumberConfirmed: {
    type: Sequelize.BOOLEAN,
    field: "PhoneNumberConfirmed"
  },
  isTwoFactorEnabled: {
    type: Sequelize.BOOLEAN,
    field: "TwoFactorEnabled"
  },
  lockoutEndDateUtc: {
    type: Sequelize.DATE,
    field: "LockoutEndDateUtc"
  },
  isLockoutEnabled: {
    type: Sequelize.BOOLEAN,
    field: "LockoutEnabled"
  },
  AccessFailedCount: {
    type: Sequelize.INTEGER,
    field: "LockoutEnabled"
  },
  username: {
    type: Sequelize.STRING,
    field: "UserName"
  }
})

user.sync().then(function() {
  console.log("ok");
}).catch(function(error) {
  console.log(error);
})
user.belongsTo(HealthRecord)

module.exports = user
