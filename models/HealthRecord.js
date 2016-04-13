
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('HealthRecords', {
        id: {
            type: DataTypes.STRING,
            field: "HealthRecordId",
            primaryKey: true
        },
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
        medicalHistory: {
            type: DataTypes.STRING,
            field: "MedicalHistory"
        },
        ChronicDiseases: {
            type: DataTypes.STRING,
            field: "ChronicDiseases"
        }
    });
};
