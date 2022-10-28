//Importing mongoose library
const mongoose = require('mongoose');

//Creating a schema for the 'comments' with attributes 'content', 'user' and 'post' having below mentioned properties(importing 'user' and  'post'attribute from 'User' and 'Post' collections, respectively).
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //Since 'comment' belongs to a user, so storing userID as well
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //Since the 'comment' is for a particular 'post'. so, storing postID as well
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

//Creating Model with name 'Post' for the schema(postSchema)
const Comment = mongoose.model('Comment', commentSchema);

//Exporting the model to be further used by the parent 'contact.js' file.
module.exports = Comment;