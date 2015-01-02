var express = require('express');
var app = express();
var _ = require('underscore');
var fs = require('fs');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile('/public/index.html', {"root": __dirname});
});

app.get('/nba', function(req, res){
	var birthday = new Date(req.query.birthday);
	fs.readFile('./public/nba_players.json', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		totalPlayers = JSON.parse(data);
		youngerPlayers = [];
		_.each(totalPlayers,function(player){
			var playerBirthday = new Date(player);
			if(birthday - playerBirthday < 0){
				youngerPlayers.push(player)
			}





		})
		console.log(youngerPlayers.length)
		var percentageOlder = ((youngerPlayers.length/totalPlayers.length)*100).toFixed(2);
		res.send({nba:percentageOlder});

	});


});






var server = app.listen(port, function(){
	console.log('listening on *:3000');
});

