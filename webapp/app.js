//Initializing the required packages
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('view engine', 'html');

app.set('views', __dirname + '/webapps');


//Configuring static pages directory.
app.use(express.static(path.join(__dirname + '/webapps')));

//Reading configuration
config    	 = require('./config/config.json');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.config = config;

module.exports = app;

//Configuring and starting the API server.
var server = app.listen(config.APP_DB_CONFIG.port, function () {
  	var host = server.address().address;
  	var port = server.address().port;
  	console.log("Example app listening at http://%s:%s", host, port);
});
