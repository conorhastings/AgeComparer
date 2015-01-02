var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var fs = require('fs')

var activeNBAPlayers = [];
var months = [{text:"January",number:1}, {text:"February", number:2}, {text:"March", number:3}, {text:"April", number:4}, {text:"May", number:5}, {text:"June", number:6}, {text:"July", number:7}, {text:"August", number:8}, {text:"September", number:9}, {text:"October", number:10},{text:"November", number:11},{text:"December", number:12}]
var days = _.range(1,32);
// console.log(months)
// console.log(days)

_.each(months,function(month){
	// console.log(month)
	_.each(days, function(day){




		request('http://www.basketball-reference.com/friv/birthdays.cgi?month='+month.number+'&day='+day, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				$ = cheerio.load(body);
				totalPlayers = $('.sortable').find('tr')

				_.each(totalPlayers, function(player){
					if(player.children[3].attribs.class === ' bold_text'){
						activeNBAPlayers.push(month.text+" "+day+", "+player.children[5].children[0].data)
						fs.writeFileSync("./public/nba_players.json", JSON.stringify(activeNBAPlayers))
		
					}
				})
			}
		})
	})
})




// array.forEach(function(birth){
// 	playerBirthday = new Date(birth)
// 	if(birthday - playerBirthday > 0){
// 	newArray.push("older")
// }

// })