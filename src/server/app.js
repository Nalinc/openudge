//General node Modules
var express = require('express');


var path = require('path');
var bodyParser = require('body-parser');


module.exports = function () {

	var app = express();

	// Support JSON-encoded bodies
	app.use(bodyParser.json());  

	// Support URL-encoded bodies     
	app.use(bodyParser.urlencoded({     
	  extended: true
	})); 

	// Enables CORS
	var enableCORS = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');

	        // intercept OPTIONS method
	    if ('OPTIONS' == req.method) {
	        res.send(200);
	    } else {
	        next();
	    }
	};
	
	app.use(enableCORS);


	//Static content
	app.use(express.static(path.normalize(__dirname + '/../client'))); 
	app.use('/bower_components',  express.static(__dirname + '/../../bower_components'));

  	return app;
};
