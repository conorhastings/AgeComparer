var express = require('express');
var app = express();
var _ = require('underscore');
var fs = require('fs');
var async = require('async');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

//birthday should be a javascript Date object
function percentageOlder(totalPlayers, birthday){
	var youngerPlayers = [];
	_.each(totalPlayers,function(player){
		var playerBirthday = new Date(player);
		if(birthday - playerBirthday < 0){
			youngerPlayers.push(player);
		}
	})
	var percentageOlder = ((youngerPlayers.length/totalPlayers.length)*100).toFixed(2);
	return percentageOlder;
};


app.get('/', function(req, res){
	res.sendFile('/public/index.html', {"root": __dirname});
});

app.get('/agedata', function(req, res){
	var birthday = new Date(req.query.birthday);

	var files = ['./public/nba_players.json','./public/nfl_players.json','./public/mlb_players.json','./public/nhl_players.json']

	async.map(files, fs.readFile, function (err, data) {

		var returnData = {}
		data.forEach(function(file,index){
			var playerData = JSON.parse(file.toString());
			console.log(playerData.length)

			if(index === 0){
				returnData.nba = percentageOlder(playerData, birthday);

			}else if(index === 1){
				returnData.nfl = percentageOlder(playerData, birthday);
			}else if(index === 2){
				returnData.mlb = percentageOlder(playerData, birthday);
			}else if(index === 3){
				returnData.nhl = percentageOlder(playerData, birthday);
			}

		})
		res.send(returnData)
	});


});









var server = app.listen(port, function(){
	console.log('listening on port '+port);
});

