"use strict";
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs").promises;
const moment = require("moment");

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

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

app.get("/", function(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/agedata", async function(req, res) {
  const birthday = new Date(req.query.birthday);

  var files = ["mlb.json", "nba.json", "nfl.json"];
  const returnData = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const jsonData = await fs.readFile(
      path.join(__dirname, "public", file),
      "utf-8"
    );
    const data = JSON.parse(jsonData);
    if (file.includes("mlb")) {
      returnData.mlb = {
        percentageYounger: percentageYounger(data, birthday),
        averageAge: averageAge(data)
      };
    } else if (file.includes("nba")) {
      returnData.nba = {
        percentageYounger: percentageYounger(data, birthday),
        averageAge: averageAge(data)
      };
    } else if (file.includes("nfl")) {
      returnData.nfl = {
        percentageYounger: percentageYounger(data, birthday),
        averageAge: averageAge(data)
      };
    }
  }

  // async.map(files, fs.readFile, function(err, data) {
  //   var returnData = {};
  //   data.forEach(function(file, index) {
  //     var playerData = JSON.parse(file.toString());

  //     if (index === 0) {
  //       returnData.nba = {
  //         percentageYounger: percentageYounger(playerData, birthday),
  //         averageAge: averageAge(playerData)
  //       };
  //     } else if (index === 1) {
  //       returnData.nfl = {
  //         percentageYounger: percentageYounger(playerData, birthday),
  //         averageAge: averageAge(playerData)
  //       };
  //     } else if (index === 2) {
  //       returnData.mlb = {
  //         percentageYounger: percentageYounger(playerData, birthday),
  //         averageAge: averageAge(playerData)
  //       };
  //     } else if (index === 3) {
  //       returnData.nhl = {
  //         percentageYounger: percentageYounger(playerData, birthday),
  //         averageAge: averageAge(playerData)
  //       };
  //     }
  //   });
  res.send(returnData);
});

var server = app.listen(port, function() {
  console.log("listening on port " + port);
});
