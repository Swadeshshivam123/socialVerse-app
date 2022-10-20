//Home controller

//We'll access this function in "routes/index.js"
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  return res.render('home', {
    title: 'Home'
  });
};
