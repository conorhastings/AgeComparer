var request = require('request');
var cheerio = require('cheerio');
var activeNBAPlayers = [];

request('http://www.basketball-reference.com/friv/birthdays.cgi?month=1&day=1', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		$ = cheerio.load(body);
		console.log($('.sortable').find('tr')[8].children[3].attribs.class.trim() === 'bold_text')
		console.log($('.sortable').find('tr')[8].children[5])
	}
})
