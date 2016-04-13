
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('dbo.User', {
        id: {
            type: DataTypes.STRING,
            field: "Id",
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: "FirstName"
        },
        lastName: {
            type: DataTypes.STRING,
            field: "LastName"
        },
        mobileNumber: {
            type: DataTypes.STRING,
            field: "MobileNumber"
        },
        email: {
            type: DataTypes.STRING,
            field: "Email"
        },
        isEmailConfirmed: {
            type: DataTypes.BOOLEAN,
            field: "EmailConfirmed"
        },
        passwordHash: {
            type: DataTypes.STRING,
            field: "PasswordHash"
        },
        securityStamp: {
            type: DataTypes.STRING,
            field: "SecurityStamp"
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: "PhoneNumber"
        },
        phoneNumberConfirmed: {
            type: DataTypes.BOOLEAN,
            field: "PhoneNumberConfirmed"
        },
        isTwoFactorEnabled: {
            type: DataTypes.BOOLEAN,
            field: "TwoFactorEnabled"
        },
        lockoutEndDateUtc: {
            type: DataTypes.DATE,
            field: "LockoutEndDateUtc"
        },
        isLockoutEnabled: {
            type: DataTypes.BOOLEAN,
            field: "LockoutEnabled"
        },
        AccessFailedCount: {
            type: DataTypes.INTEGER,
            field: "LockoutEnabled"
        },
        username: {
            type: DataTypes.STRING,
            field: "UserName"
        },
        tokenHash: {
          type: DataTypes.STRING,
          field: "TokenHash"
        }
    });
};
