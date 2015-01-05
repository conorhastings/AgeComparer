var express = require('express');
var app = express();
var _ = require('underscore');
var fs = require('fs');
var async = require('async');
var moment = require('moment');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

//birthday should be a javascript Date object
//totalPlayers should be an array of dates, but not Date Objects
function percentageYounger(totalPlayers, birthday){
	var youngerPlayers = 0;
	_.each(totalPlayers,function(player){
		var playerBirthday = new Date(player);
		if(birthday - playerBirthday < 0){
			youngerPlayers += 1;
		}
	})
	var percentageYounger = ((youngerPlayers/totalPlayers.length)*100).toFixed(2);
	return percentageYounger;
};


function averageAge(totalPlayers){
	var ages = [];
	_.each(totalPlayers, function(player){

		var birthday = moment(new Date(player));
		var today = moment();
		ages.push(today.diff(birthday,'years',true));
	})
	totalAge = 0;
	_.each(ages,function(age){
		totalAge += age;
	})
	return totalAge / totalPlayers.length;
}


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


			if(index === 0){
				returnData.nba = percentageYounger(playerData, birthday);
			}else if(index === 1){
				returnData.nfl = percentageYounger(playerData, birthday);
			}else if(index === 2){
				returnData.mlb = percentageYounger(playerData, birthday);
			}else if(index === 3){
				returnData.nhl = percentageYounger(playerData, birthday);
			}

		})
		res.send(returnData)
	});


});


var server = app.listen(port, function(){
	console.log('listening on port '+port);
});

