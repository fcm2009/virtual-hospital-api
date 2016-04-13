
module.exports = {
    cloud: {
        host: "virtualhospital.database.windows.net",
        database: "virtualhospitalDB",
        username: "SWE418-VH",
        password: "VH@20155",
        dialect: "mssql",
        port: 1433
    },
    local: {
        host: "192.168.56.102",
        database: "VHDB",
        username: "sa",
        password: "vhdb",
        dialect: "mssql",
        port: 1433
    }
};