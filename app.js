const dotenv = require("dotenv");
let result = dotenv.config();
const fs = require("fs");

// only run if today is Friday
if (new Date().getDay() === 5) {
  var Twit = require("twit");

  var T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
  });

  let cocktail = {};

  fs.readFile("./cocktail.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const cocktails = JSON.parse(jsonString).data;
      let now = new Date();
      let onejan = new Date(now.getFullYear(), 0, 1);
      let week = Math.ceil(
        ((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
          7
      );
      cocktail = cocktails[week];
      console.log(cocktail);
      T.post(
        "statuses/update",
        {
          status:
            `${cocktail.name}\n${cocktail.detail}`,
        },
        function (err, data, response) {
          console.log(data);
        }
      );
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
  return;
}
console.log("Today is not Friday");
