
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
        medicalHistory: {
            type: DataTypes.STRING,
            field: "MedicalHistory"
        },
        chronicDiseases: {
            type: DataTypes.STRING,
            field: "ChronicDiseases"
        }
    });
};
