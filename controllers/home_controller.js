//Home controller

//We'll access this function in "routes/index.js"
module.exports.home = function (req, res) {
  //Rendering the following information to 'home.ejs'
  return res.render("home", {
    title: "socialVerse",
  });
};
