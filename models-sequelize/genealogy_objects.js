var Sequelize = require('sequelize');
var SequelizeConfig = require('../models-sequelize/sequelizeconfig');

var _GenealogyObjects = undefined;

module.exports = GenealogyObjects;

// Connect and create table
function GenealogyObjects()
{
	var tablename = "genealogy_objects"
	var construct = {
		objectId: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        objectName: Sequelize.STRING,
        parentId: Sequelize.STRING
	};
	_GenealogyObjects = new SequelizeConfig(tablename, construct);
}

function callback(err) {
    if(err)
        throw err;
}

// Disconnect
GenealogyObjects.prototype.disconnect = function(callback) {
    callback();
}

// Insert data 
GenealogyObjects.prototype.create = function(objectId, objectName, parentId) {
	var _parentId = '';	
	if(parentId)
		_parentId = parentId;
    _GenealogyObjects.create({
            objectId: objectId,
            objectName: objectName,
            parentId: _parentId
        }).then(function(note) {
            callback();
        }).error(function(err) {
            callback(err);
    });
}

// Update data 
GenealogyObjects.prototype.update = function(key, title, body, callback) {
    GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        if(!note) {
            callback(new Error("No note found for key " + key));
        } else {
            note.updateAttributes({
                title: title,
                body: body
            }).then(function() { 
                callback();
            }).error(function(err) {
                callback(err);
            });
        }
    }).error(function(err) {
        callback(err);
    });
}

// Get row data
GenealogyObjects.prototype.find = function(key, callback) {
    GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        if(!note) {
            callback("Nothing found for " + key);
        } else {
            callback(null, {
                notekey: note.notekey,
                title: note.title,
                body: note.body
            });
        }
    });
}

// Delete Data 
GenealogyObjects.prototype.destroy = function(key, callback) {
    GenealogyObjects.find({ where:{ notekey: key} }).then(function(note) {
        note.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}

// Get All Data 
GenealogyObjects.prototype.findAll = function() { 	
	var result = [];
	_GenealogyObjects.findAll().then(Objects => {			
		Objects.forEach(function(element){
			result.push(element.dataValues);
		});
	});
	return result;
}