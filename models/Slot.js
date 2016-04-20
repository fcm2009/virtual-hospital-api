
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Slot', {
        status: {
            type: DataTypes.BOOLEAN,
            field: "Status"
        },
        time: {
            type: DataTypes.DATE,
            field: "Time"
        }
    });
};