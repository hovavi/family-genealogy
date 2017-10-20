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

module.exports = Config;

function Config()
{
	var sequlz = new Sequelize(
        connectString.dbname, 
        connectString.username, 
        connectString.password,
        connectString.params
    ); 
	_Config = sequlz.define('table_config', {
        notekey: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        title: Sequelize.STRING,
        body: Sequelize.TEXT		
    });
    _Config.sync().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
}

function callback(err) {
    if(err)
        throw err;
}

Config.prototype.create =  function(key, title, body, callback) {
    _Config.create({
            notekey: key,
            title: title,
            body: body
        }).then(function(note) {
            callback();
        }).error(function(err) {
            callback(err);
    });
}
// .connect = function(params, callback) {
    // var sequlz = new Sequelize(
        // params.dbname, 
        // params.username, 
        // params.password,
        // params.params
    // );
    // GenealogyObjects = sequlz.define('GenealogyObjects', {
        // notekey: {
            // type: Sequelize.STRING,
            // primaryKey: true,
            // unique: true
        // },
        // title: Sequelize.STRING,
        // body: Sequelize.TEXT		
    // });
    // GenealogyObjects.sync().then(function() {
        // callback();
    // }).error(function(err) {
        // callback(err);
    // });
// }

// exports.disconnect = function(callback) {
    // callback();
// }
 
// exports.create = function(key, title, body, callback) {
    // GenealogyObjects.create({
            // notekey: key,
            // title: title,
            // body: body
        // }).then(function(note) {
            // callback();
        // }).error(function(err) {
            // callback(err);
    // });
// }
 
// exports.update = function(key, title, body, callback) {
    // GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        // if(!note) {
            // callback(new Error("No note found for key " + key));
        // } else {
            // note.updateAttributes({
                // title: title,
                // body: body
            // }).then(function() { 
                // callback();
            // }).error(function(err) {
                // callback(err);
            // });
        // }
    // }).error(function(err) {
        // callback(err);
    // });
// }
 
// exports.read = function(key, callback) {
    // GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        // if(!note) {
            // callback("Nothing found for " + key);
        // } else {
            // callback(null, {
                // notekey: note.notekey,
                // title: note.title,
                // body: note.body
            // });
        // }
    // });
// }
 
// exports.destroy = function(key, callback) {
    // GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        // note.destroy().then(function() {
        // callback();
    // }).error(function(err) {
        // callback(err);
    // });
    // });
// }
 
// exports.titles = function(callback) { 
    // GenealogyObjects.findAll().then(function(notes) { 
        // var noteList = []; 
        // notes.forEach(function(note) { 
            // noteList.push({
                // key: note.notekey,
                // title: note.title
            // }); 
        // });
        // callback(null, noteList);
    // });
// }