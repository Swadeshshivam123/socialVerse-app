//Creating controller for 'posts'

//Importing 'post.js' model(database) from 'models' directory.
const Post = require('../models/post');

//Importing 'comment.js' model(database) from 'models' directory.
const Comment = require('../models/comment');

//We'll access these functionalities in "routes/posts.js"


//Creating a post from the data obtainde from the 'create-post' form.
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id,
    },
    //Callback Function
    function(err, post){
        //Error Handling
        if(err){
            console.log("Error in creating post.!");
            return;
        }

        return res.redirect('back');
    }
    );
};


//Deleting a post based on its id
module.exports.destroy = function(req, res){
    //Firstly, checking if that 'post' exists in the 'Post' database or not
    Post.findById(req.params.id, 
        //Callback function
        function(err, post){
            //Error Handling
            if(err){
                console.log('Error in finding the post in the database.!');
                return;
            }
            
            //Checking if the posts to be deleted is created by the same user who wishes to delete them.
                //'.id' means converting the object id('_id') into string.
                if(post.user == req.user.id){
                    //Deleteing that post from the 'Post' database
                     post.remove();
                     //Removing comments from 'Comment' database for that post as well.
                     //Deleting all the comments on the basis of 'post-id' and redirecting back to the same page.
                     Comment.deleteMany({post: req.params.id}, function(err){
                         return res.redirect('back');
                     });
                 }
                 //If the post's user is different from the user trying to delete the post, then redirect back to same page. No deletion happening.
                 else{
                     return res.redirect('back');
                 }
        });
};


