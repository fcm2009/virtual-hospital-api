
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appointment', {
        status: {
            type: DataTypes.INTEGER,
            field: "Status"
        },
        date: {
            type: DataTypes.DATE,
            field: "Date"
        }
    });
};
