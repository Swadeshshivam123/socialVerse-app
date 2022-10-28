//Home controller

//Importing 'Post' collection from 'models' directory
const Post = require('../models/post');

//We'll access this function in "routes/index.js"
module.exports.home = function (req, res) {
  
  Post.find({}, function(err, posts){
    return res.render('home', {
      title: 'socialVerse | Home',
      posts: posts
    });
  });

  // return res.render("home", {
  //   title: "socialVerse | Home",
  // });
};
