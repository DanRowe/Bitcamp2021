const dotenv = require("dotenv");
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

  //
  //  tweet 'hello world!'
  //
  T.post(
    "statuses/update",
    {
      status:
        "Reverse Revolver\n2 oz coffee liqueur, 0.5 oz whiskey, 2 dashes orange bitters",
    },
    function (err, data, response) {
      console.log(data);
    }
  );
  return;
}
console.log("Today is not Friday");