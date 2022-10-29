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

//Deleting a 'comment' based on its id
module.exports.destroy = function(req, res){
    //Finding the 'comment' by its's id availavle in 'req.params'
    Comment.findById(req.params.id, function(err, comment){
        //Error Handling       
        if(err){
            console.log("Error in finding the comment in the database.!");
            return;
        }
        // If the user trying to delete the 'comment' is same as the user who created the comment',
        if(comment.user==req.user.id){
            
            //Firstly saving the postId to which this 'comment' belonged to.
            let postId = comment.post;
            //Deleting the 'comment' from 'Comment' database.
            comment.remove();
            //Now, finding the comment in 'comments' array of post with id (postId) and deleting the comment Id from the 'Post.comments' as well and updating the 'Post' database.
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                if(err){
                    console.log('Error in finding the post with id - postId in the Post database.!');
                    return;
                }
                return res.redirect('back');
            });
        }
        //Else, redirecting back to the same page.
        else{
            return res.redirect('back');
        }
    });
};