var http = require("http");
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var server = http.createServer(app);

//schema declaration
var TrackSchema = mongoose.Schema({
	key: String,
    	url: String,
    	selector: Array,
    	value: String,
    	user: String
});

var TrackModel = mongoose.model('Track', TrackSchema);

//Connecting to db
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
	console.log('Connected');
});

app.configure(function(){
	app.set('port', process.env.PORT || 8000);
	app.set('address', process.env.ADDRESS || 'localhost');
	app.use(express.bodyParser());
});

app.post('/createTrack', function(req, res){
	var newTrack = new TrackModel;
	
	newTrack.key = createUniqueId();
	newTrack.url = req.body.url;
	newTrack.selector = req.body.selectors;
	newTrack.value = req.body.value;
	if (typeof req.body.user === "undefined")
		newTrack.user = "none";
	else
		newTrack.user = req.body.user;

	console.log("New track created:");
	console.log(newTrack);
	newTrack.save();

	res.send(newTrack);
});

app.get('/getTrackValue', function(req, res){
	TrackModel.findOne({key: req.query.key}, function (err, data) {
		if(!data){
			res.end();
		}

		console.log("Value retrieved:");
		console.log(data);
		res.send(data);
	})
});

app.get('/getTrackValueByURL', function(req, res){
	TrackModel.findOne({url: req.query.url}, function (err, data) {
		if(!data){
			res.end();
		}

		res.send(data);
	})
});


server.listen(app.get('port'), function(){
	console.log("Listening on port " + app.get('port'));
});

function createUniqueId() {
	var uuid = require('node-uuid');
	return uuid.v4();
}
