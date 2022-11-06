//Home controller

//Importing 'Post' collection from 'models' directory
const Post = require("../models/post");

//Importing 'Post' collection from 'models' directory
const User = require("../models/user");

// //We'll access this function in "routes/comment.js"

//Using 'async await' to make the code look simpler and cleaner

module.exports.home = async function (req, res) {
  //Error handling using 'try and catch'.
  try {
    //Awaiting for this query to populate 'user' of each 'post' and finding all the posts and then further using nested population, finding details of all the comments of every posts and also the details of the users who posted those comments.
    //Using 'sort()' function to sort the osts in 'reverse chronological order'
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    //Awaiting for this query to find all the users in the User database.
    let users = await User.find({});

    //Rendering all the below data to the 'home' page
    return res.render("home", {
      title: "socialVerse | Home",
      posts:  posts,
      all_users: users
    });
  } catch (err) {
    //Flashing 'error' message notification successfully
    req.flash('error', err);
    return;
  }
};
