//Importing 'Comment' collection from 'models' directory
const Comment = require('../models/comment');

//Importing 'Post' collection from 'models' directory
const Post = require('../models/post');

//Creating comment for the post by using the data recieved from the 'post-comments-form'.
module.exports.create = function(req, res){
   //Firstly finding the 'post' to which this 'comment'(to be created) belongs by its 'postID'.
    Post.findById(req.body.post, function(err, post){
    //Error Handling
        if(err){
        console.log('Error in finding the post.!');
        return;
    }
    //If the 'post' is found in the 'Post' database(valid post), then creating the 'comment' for that post. 
    if(post){
        //Creating comment for the 'post'      s
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        
       }, function(err, comment){
        if(err){
            //Error Handling
            console.log('Error in creating the comment.!');
            return;
        }
        
        //Pushing this 'comment' to 'Post' database t store its 'commentID' in the 'comments' array of 'Post'
        //This is automatically done by mongoDB
        post.comments.push(comment);
        //SInce, 'Post' database is updated, so we need to save the changes in 'Post'. Hence,
        post.save();
        //Redirecting back to the same page after successfully creating the comment for that post
        res.redirect('/');
       });
    }
    //If the 'post' is NOT found in the 'Post' database(invalid post), then simply ignore.
   });
};