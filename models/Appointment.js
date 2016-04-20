
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appointment', {
        status: {
            type: DataTypes.INTEGER,
            field: "Status"
        }
    });
};
