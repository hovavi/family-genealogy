var Sequelize = require('sequelize');

var connectString = {
    dbname: "familygenealogy",
    username: "root",
    password: "123456",
    params: {
        host: "127.0.0.1",
        dialect: "mysql"
    }
};

var _Config = undefined;

module.exports = SequelizeModel;

function SequelizeModel(table, construct, callback)
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

