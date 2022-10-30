//Creating controller for 'posts'

//Importing 'post.js' model(database) from 'models' directory.
const Post = require("../models/post");

//Importing 'comment.js' model(database) from 'models' directory.
const Comment = require("../models/comment");

//We'll access these functionalities in "routes/posts.js"

//Creating a post from the data obtainde from the 'create-post' form.
//Using async await
module.exports.create = async function (req, res) {
  //Error handling using 'try and catch'.
  try {
    //Awaiting for this query to create post wij details obtained from the form(present in req.body).
    let posts = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    //Flashing 'success' message notification. 
    req.flash('success', 'Posted!');
    //Redirecting back to the same page after successfully creating post.
    return res.redirect("back");
  } catch (err) {
    //Flashing 'error' message notification. 
    req.flash('error', err);
    return res.redirect("back"); 
  }
};

//Deleting a post based on its id
//Using async await
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    //Checking if the posts to be deleted is created by the same user who wishes to delete them.
    //'.id' means converting the object id('_id') into string.
    if (post.user == req.user.id) {
      //Deleteing that post from the 'Post' database
      post.remove();

      //Awaiting for this query to remove comments from 'Comment' database for that post as well on the basis of 'post-id'.
      await Comment.deleteMany({ post: req.params.id });

      //Flashing 'success' message notification
      req.flash('success', 'Post and associated comments deleted successfully!');

      //Rendering back to the same page after successfully deleting the posts and all of its comments from the database.
      return res.redirect("back");
    }else{
      //Flashing 'error' message notification. 
      req.flash('error', 'You cannot delete this post!');  
      return res.redirect("back"); 
    }
  } catch (err) {
    //Flashing 'error' message notification. 
    req.flash('error', err);
    return res.redirect("back"); 
  }
};
