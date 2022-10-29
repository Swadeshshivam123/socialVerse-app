//Home controller

//Importing 'Post' collection from 'models' directory
const Post = require("../models/post");

//Importing 'Post' collection from 'models' directory
const User = require("../models/user");

// //We'll access this function in "routes/comment.js"
// module.exports.home = function(req, res){
//   //Query to populate 'user' of each 'post' and finding all the posts and then further using nested population, finding details of all the comments of every posts and also the details of the users who posted those comments. Furthermore, rendering them to be further used by 'home.ejs' file and displayng the updated 'home' page.
//   Post.find({}).populate('user').populate({path: 'comments', populate: {path: 'user'}}).exec(function(err, posts){

//    User.find({}, function(err, users){
//     if(err){
//       console.log('Error in finding the users from the User database.!');
//       return;
//     }

//     return res.render('home', {
//       title: 'socialVerse | Home',
//       posts:  posts ,
//       all_users: users
//     });

//    });

//   });
// }

//Using 'async await' tp make the code look simpler and cleaner

module.exports.home = async function (req, res) {
  //Error handling using 'try and catch'.
  try {
    //Query to populate 'user' of each 'post' and finding all the posts and then further using nested population, finding details of all the comments of every posts and also the details of the users who posted those comments.
    let posts = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    //Query to find all the users in the User database.
    let users = await User.find({});

    //Rendering all the below data to the 'home' page
    return res.render("home", {
      title: "socialVerse | Home",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log("Error in rendering the home page.!", err);
    return;
  }
};
