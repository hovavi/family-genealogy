var express = require('express');
var router = express.Router();
var GenealogyObjects = require('../models-sequelize/genealogy_objects');

var objects = new GenealogyObjects();
var listObject = objects.findAll();
/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { title: 'Family Genealogy', listObject: listObject });
});

module.exports = router;
