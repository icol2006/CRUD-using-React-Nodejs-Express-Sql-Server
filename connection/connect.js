var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: '123456',
        server: 'localhost',
        database: 'test'
    });

    return conn;
};

module.exports = connect;