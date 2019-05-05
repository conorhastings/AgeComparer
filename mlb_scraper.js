const cheerio = require('cheerio');
const fs = require('fs')
const axios = require('axios');
const teamUrls = [
  "https://www.lineups.com/mlb/roster/arizona-diamondbacks",
  "https://www.lineups.com/mlb/roster/atlanta-braves",
  "https://www.lineups.com/mlb/roster/baltimore-orioles",
  "https://www.lineups.com/mlb/roster/boston-red-sox",
  "https://www.lineups.com/mlb/roster/chicago-cubs",
  "https://www.lineups.com/mlb/roster/chicago-white-sox",
  "https://www.lineups.com/mlb/roster/cincinnati-reds",
  "https://www.lineups.com/mlb/roster/cleveland-indians",
  "https://www.lineups.com/mlb/roster/colorado-rockies",
  "https://www.lineups.com/mlb/roster/detroit-tigers",
  "https://www.lineups.com/mlb/roster/houston-astros",
  "https://www.lineups.com/mlb/roster/kansas-city-royals",
  "https://www.lineups.com/mlb/roster/los-angeles-angels",
  "https://www.lineups.com/mlb/roster/los-angeles-dodgers",
  "https://www.lineups.com/mlb/roster/miami-marlins",
  "https://www.lineups.com/mlb/roster/milwaukee-brewers",
  "https://www.lineups.com/mlb/roster/minnesota-twins",
  "https://www.lineups.com/mlb/roster/new-york-mets",
  "https://www.lineups.com/mlb/roster/new-york-yankees",
  "https://www.lineups.com/mlb/roster/oakland-athletics",
  "https://www.lineups.com/mlb/roster/philadelphia-phillies",
  "https://www.lineups.com/mlb/roster/pittsburgh-pirates",
  "https://www.lineups.com/mlb/roster/san-diego-padres",
  "https://www.lineups.com/mlb/roster/san-francisco-giants",
  "https://www.lineups.com/mlb/roster/seattle-mariners",
  "https://www.lineups.com/mlb/roster/st-louis-cardinals",
  "https://www.lineups.com/mlb/roster/tampa-bay-rays",
  "https://www.lineups.com/mlb/roster/texas-rangers",
  "https://www.lineups.com/mlb/roster/toronto-blue-jays",
  "https://www.lineups.com/mlb/roster/washington-nationals"
];

let birthdays = [];
teamUrls.forEach((url, i) => axios(url).then(response => {
	const dom = cheerio.load(response.data);
	dom(".t-content")
  .find("td:nth-child(8)")
  .each(function() {
		const text = dom(this).text();
		if (text) {
	 fs.appendFileSync('./public/mlb.json',`"${text}",\n`)
	}
	});
}));
