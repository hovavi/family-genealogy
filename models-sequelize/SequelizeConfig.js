var Sequelize = require('sequelize');

var connectString = {
    dbname: "sql10200206",
    username: "sql10200206",
    password: "T8FkWEkJZn",
    params: {
        host: "sql10.freemysqlhosting.net",
        dialect: "mysql"
    }
};

var _Config = undefined;

module.exports = SequelizeConfig;

function SequelizeConfig(table, construct)
{
	var sequlz = new Sequelize(
        connectString.dbname, 
        connectString.username, 
        connectString.password,
        connectString.params
    ); 
	_Config = sequlz.define(table, construct);
    _Config.sync().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
	return _Config;
}

function callback(err) {
    if(err)
        throw err;
}
