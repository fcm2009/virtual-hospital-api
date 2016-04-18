

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('MedicalHistory', {
        title: {
            type: DataTypes.STRING,
            field: "Title"
        },
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
