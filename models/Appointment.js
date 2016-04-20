
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appointment', {
        isAvailable: {
            type: DataTypes.INTEGER,
            field: "Status"
        }
    });
};
