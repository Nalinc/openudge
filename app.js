//General node Modules
var express = require('express');

var bodyParser = require('body-parser');


module.exports = function () {

	var app = express();

	// Support JSON-encoded bodies
	app.use(bodyParser.json());  

	// Support URL-encoded bodies     
	app.use(bodyParser.urlencoded({     
	  extended: true
	})); 


	//Static content
	app.use(express.static(path.normalize(__dirname + '/../client'))); 
	app.use('/bower_components',  express.static(__dirname + '/../../bower_components'));

  	return app;
};
