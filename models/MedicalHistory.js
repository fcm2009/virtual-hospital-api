

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('MedicalHistory', {
        fileName: {
            type: DataTypes.STRING,
            field: "FileName"
        },
        path: {
            type: DataTypes.STRING,
            field: "Path"
        }
    });
};
