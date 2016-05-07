
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('HealthRecords', {
        age: {
            type: DataTypes.INTEGER,
            field: "Age"
        },
        height: {
            type: DataTypes.INTEGER,
            field: "Height"
        },
        weight: {
            type: DataTypes.INTEGER,
            field: "Weight"
        },
        diabetes: {
            type: DataTypes.BOOLEAN,
            field: "Diabetes"
        },
        hypertension: {
            type: DataTypes.BOOLEAN,
            field: "Hypertension"
        },
        chronicDiseases: {
            type: DataTypes.STRING,
            field: "ChronicDiseases"
        }
    });
};
