var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

var activeNBAPlayers = [];
var months = _.range(1, 13);
var days = _.range(1,32);


request('http://www.basketball-reference.com/friv/birthdays.cgi?month=1&day=1', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		$ = cheerio.load(body);
		totalPlayers = $('.sortable').find('tr')

		_.each(totalPlayers, function(player){
			if(player.children[3].attribs.class === ' bold_text'){
				activeNBAPlayers.push(player.children[5].children[0].data)
			}
		})
		console.log(activeNBAPlayers)

		// console.log(totalPlayers)

		// console.log($('.sortable').find('tr')[8].children[3].attribs.class.trim() === 'bold_text')
		// console.log($('.sortable').find('tr')[8].children[5].children[0].data)
	}
})
