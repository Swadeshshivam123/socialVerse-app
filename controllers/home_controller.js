
//We'll access this function in "routes/index.js"
module.exports.home = function (req, res) {
  return res.end("<h1>Express is up for socialVerse.!</h1>");
};