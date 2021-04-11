const dotenv = require("dotenv");
const PythonShell = require("python-shell");
const { spawn } = require("child_process");
let result = dotenv.config();
var cocktails = require('./cocktail.json');
// only run if today is Friday
if (new Date().getDay() === 0) {
  var Twit = require("twit");
  var T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
  });

  function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
  let string = `Try a ${cocktails.data[getNumberOfWeek()].name} with ${cocktails.data[getNumberOfWeek()].detail}`
  T.post(
    "statuses/update",
    { status: string},
    function (err, data, response) {
      console.log(data);
      console.log(out.length);
    }
  );
}
console.log("Today is not Friday");