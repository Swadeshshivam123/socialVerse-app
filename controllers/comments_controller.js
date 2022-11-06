//Importing 'Comment' collection from 'models' directory
const Comment = require('../models/comment');

//Importing 'Post' collection from 'models' directory
const Post = require('../models/post');

//Creating comment for the post by using the data recieved from the 'post-comments-form'.
module.exports.create = async function(req, res){

    try{
        //Firstly finding the 'post' to which this 'comment'(to be created) belongs by its 'postID'.
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            //Pushing this 'comment' to 'Post' database to store its 'commentID' in the 'comments' array of 'Post'
            //This is automatically done by  mongoDB
            post.comments.push(comment);

            //Since, 'Post' database is updated, so we need to save the changes in 'Post'. Hence,
            post.save();

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment posted!');

            res.redirect('/');
        }
    }catch(err){
        //Error Handling
        //Flashing 'error' message notification    
        req.flash('error', err);
        return;
    }
    
}

//Deleting a 'comment' based on its id
module.exports.destroy = async function(req, res){

    try{
        //Finding the 'comment' by its's id availavle in 'req.params'
        let comment = await Comment.findById(req.params.id);

        // If the user trying to delete the 'comment' is same as the user who created the comment',
        if (comment.user == req.user.id){
            //Firstly saving the postId to which this 'comment' belonged to.
            let postId = comment.post;
            //Deleting the 'comment' from 'Comment' database.
            comment.remove();
            //Now, finding the comment in 'comments' array of post with id (postId) and deleting the comment Id from the 'Post.comments' as well and updating the 'Post' database.
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            //Flashing 'success' message notification  
            req.flash('success', 'Comment deleted!');
            //Redirecting back to the same page
            return res.redirect('back');
        }else{
            //Flashing 'error' message notification
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        //Error Handling
        //Flashing 'error' message notification
        req.flash('error', err);
        return;
    }
    
}