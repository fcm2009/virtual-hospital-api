
connection = {
    cloud: {
        host: "virtualhospital.database.windows.net",
        database: "virtualhospitalDB",
        username: "SWE418-VH",
        password: "VH@20155",
        dialect: "mssql",
        port: 1433
    },
    localMSSQL: {
        host: "192.168.58.101",
        database: "VHDB",
        username: "sa",
        password: "vhdb",
        dialect: "mssql",
        port: 1433
    },
    localMySql: {
        host: "localhost",
        database: "VHDB",
        username: "root",
        password: "vhdb",
        dialect: "mysql",
        port: 3306
    }
};
module.exports = connection.localMySql;
