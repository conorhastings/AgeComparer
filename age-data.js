const fs = require("fs");
const path = require("path");
const moment = require("moment");
const url = require("url");

//birthday should be a javascript Date object
//totalPlayers should be an array of dates, but not Date Objects
function percentageYounger(totalPlayers, birthday) {
  const youngerPlayers = totalPlayers.reduce((younger, player) => {
    const playerBirthday = new Date(player);
    if (birthday - playerBirthday < 0) {
      younger += 1;
    }
    return younger;
  }, 0);
  return ((youngerPlayers / totalPlayers.length) * 100).toFixed(2);
}

function averageAge(totalPlayers) {
  const totalPlayerAge = totalPlayers.reduce((totalAge, playerBirthday) => {
    const birthday = moment(new Date(playerBirthday));
    const today = moment();
    totalAge += today.diff(birthday, "years", true);
    return totalAge;
  }, 0);
  return (totalPlayerAge / totalPlayers.length).toFixed(2);
}
module.exports = (req, res) => {
  console.log(req.url, "conor sucks");
  const { query } = url.parse(req.url, true);
  console.log(query);
  const { birthday } = query;
  const birthdayDateObject = new Date(birthday);
  const mlbData = JSON.parse(fs.readFileSync(
    path.join(__dirname, "public", "mlb.json"),
    "utf-8"
  ));
  const nbaData = JSON.parse(fs.readFileSync(
    path.join(__dirname, "public", "nba.json"),
    "utf-8"
  ));
  const nflData = JSON.parse(fs.readFileSync(
    path.join(__dirname, "public", "nfl.json"),
    "utf-8"
  ));
  const returnData = {
    mlb: {
      percentageYounger: percentageYounger(mlbData, birthdayDateObject),
      averageAge: averageAge(mlbData)
    },
    nba: {
      percentageYounger: percentageYounger(nbaData, birthdayDateObject),
      averageAge: averageAge(nbaData)
    },
    nfl: {
      percentageYounger: percentageYounger(nflData, birthdayDateObject),
      averageAge: averageAge(nflData)
    }
  };
  res.end(JSON.stringify(returnData));
};
