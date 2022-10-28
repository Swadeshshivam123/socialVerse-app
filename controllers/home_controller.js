//Home controller

//Importing 'Post' collection from 'models' directory
const Post = require('../models/post');

//We'll access this function in "routes/index.js"
module.exports.home = function (req, res) {

  //Populating 'user' of each 'post' and finding all the posts and rendering them to be further used by 'home.ejs' file and displayng the updated 'home' page.
  Post.find({}).populate('user').exec(function(err, posts){
    return res.render('home', {
      title: 'socialVerse | Home',
      posts: posts
    });
  });
};
