const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const teamUrls = [
  "https://www.lineups.com/nba/roster/atlanta-hawks",
  "https://www.lineups.com/nba/roster/boston-celtics",
  "https://www.lineups.com/nba/roster/brooklyn-nets",
  "https://www.lineups.com/nba/roster/charlotte-hornets",
  "https://www.lineups.com/nba/roster/chicago-bulls",
  "https://www.lineups.com/nba/roster/cleveland-cavaliers",
  "https://www.lineups.com/nba/roster/dallas-mavericks",
  "https://www.lineups.com/nba/roster/denver-nuggets",
  "https://www.lineups.com/nba/roster/detroit-pistons",
  "https://www.lineups.com/nba/roster/golden-state-warriors",
  "https://www.lineups.com/nba/roster/houston-rockets",
  "https://www.lineups.com/nba/roster/indiana-pacers",
  "https://www.lineups.com/nba/roster/los-angeles-clippers",
  "https://www.lineups.com/nba/roster/los-angeles-lakers",
  "https://www.lineups.com/nba/roster/memphis-grizzlies",
  "https://www.lineups.com/nba/roster/miami-heat",
  "https://www.lineups.com/nba/roster/milwaukee-bucks",
  "https://www.lineups.com/nba/roster/minnesota-timberwolves",
  "https://www.lineups.com/nba/roster/new-orleans-pelicans",
  "https://www.lineups.com/nba/roster/new-york-knicks",
  "https://www.lineups.com/nba/roster/oklahoma-city-thunder",
  "https://www.lineups.com/nba/roster/orlando-magic",
  "https://www.lineups.com/nba/roster/philadelphia-76ers",
  "https://www.lineups.com/nba/roster/phoenix-suns",
  "https://www.lineups.com/nba/roster/portland-trail-blazers",
  "https://www.lineups.com/nba/roster/sacramento-kings",
  "https://www.lineups.com/nba/roster/san-antonio-spurs",
  "https://www.lineups.com/nba/roster/toronto-raptors",
  "https://www.lineups.com/nba/roster/utah-jazz",
  "https://www.lineups.com/nba/roster/washington-wizards"
];

teamUrls.forEach((url, i) =>
  axios(url).then(response => {
    const dom = cheerio.load(response.data);
    dom(".t-content")
      .find("td:nth-child(10)")
      .each(function() {
        const text = dom(this).text();
        if (text) {
          fs.appendFileSync("./public/nba.json", `"${text}",\n`);
        }
      });
  })
);
