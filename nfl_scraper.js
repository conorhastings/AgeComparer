const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const teamUrls = [
  "https://www.lineups.com/nfl/roster/arizona-cardinals",
  "https://www.lineups.com/nfl/roster/atlanta-falcons",
  "https://www.lineups.com/nfl/roster/baltimore-ravens",
  "https://www.lineups.com/nfl/roster/buffalo-bills",
  "https://www.lineups.com/nfl/roster/carolina-panthers",
  "https://www.lineups.com/nfl/roster/chicago-bears",
  "https://www.lineups.com/nfl/roster/cincinnati-bengals",
  "https://www.lineups.com/nfl/roster/cleveland-browns",
  "https://www.lineups.com/nfl/roster/dallas-cowboys",
  "https://www.lineups.com/nfl/roster/denver-broncos",
  "https://www.lineups.com/nfl/roster/detroit-lions",
  "https://www.lineups.com/nfl/roster/green-bay-packers",
  "https://www.lineups.com/nfl/roster/houston-texans",
  "https://www.lineups.com/nfl/roster/indianapolis-colts",
  "https://www.lineups.com/nfl/roster/jacksonville-jaguars",
  "https://www.lineups.com/nfl/roster/kansas-city-chiefs",
  "https://www.lineups.com/nfl/roster/los-angeles-chargers",
  "https://www.lineups.com/nfl/roster/los-angeles-rams",
  "https://www.lineups.com/nfl/roster/miami-dolphins",
  "https://www.lineups.com/nfl/roster/minnesota-vikings",
  "https://www.lineups.com/nfl/roster/new-england-patriots",
  "https://www.lineups.com/nfl/roster/new-orleans-saints",
  "https://www.lineups.com/nfl/roster/new-york-giants",
  "https://www.lineups.com/nfl/roster/new-york-jets",
  "https://www.lineups.com/nfl/roster/oakland-raiders",
  "https://www.lineups.com/nfl/roster/philadelphia-eagles",
  "https://www.lineups.com/nfl/roster/pittsburgh-steelers",
  "https://www.lineups.com/nfl/roster/san-francisco-49ers",
  "https://www.lineups.com/nfl/roster/seattle-seahawks",
  "https://www.lineups.com/nfl/roster/tampa-bay-buccaneers",
  "https://www.lineups.com/nfl/roster/tennessee-titans",
  "https://www.lineups.com/nfl/roster/washington-redskins"
];
teamUrls.forEach((url, i) =>
  axios(url).then(response => {
    const dom = cheerio.load(response.data);
    dom(".t-content")
      .find("td:nth-child(10)")
      .each(function() {
        const text = dom(this).text();
        if (text) {
          fs.appendFileSync("./public/nfl.json", `"${text}",\n`);
        }
      });
  })
);
