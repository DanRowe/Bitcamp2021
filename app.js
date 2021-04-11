const dotenv = require("dotenv");
const PythonShell = require("python-shell");
const { spawn } = require("child_process");
let result = dotenv.config();

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

  const python = spawn("python", ["webscraper.py"]);
  let output = [];
  python.stdout.on("data", function (data) {
    output.push(data);
  });
  let response = "";
  let name = "";
  python.on("close", (code) => {
    m = output.join("").match(/.{1,141}\./g);
    for (let i = 0; i < m.length; i++) {
      console.log(`(${i + 1}/${m.length})` + m[i]);

      if (i == 0) {
        sleep(4000);
        T.post(
          "statuses/update",
          { status: `(${i + 1}/${m.length})` + m[i] },
          function (err, data, response) {
            console.log(data);
            let out = output.join("");
            console.log(out.length);
            reponse = data.id_str;
            // name = data.user
          }
        );
      } else {
        sleep(4000);
        T.post(
          `statuses/update`,
          {
            in_reply_to_status_id: "" + response,
            status: `(${i + 1}/${m.length})` + m[i] + ` @weekendcocktai1`,
          },
          function (err, data, response) {
            console.log(data);
            let out = output.join("");
            console.log(out.length);
          }
        );
      }
    }
  });
}
console.log("Today is not Friday");
