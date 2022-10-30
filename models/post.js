//Importing mongoose library
const mongoose = require('mongoose');

//Creating a schema for the 'post' with attributes 'content''user' and 'comments'  having below mentioned properties(importing 'user' and 'comments' attribute from 'User' and 'Comment' collections).
const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  //Including an array of IDs of 'comments' of each post in this post schema itself.
  comments: [
    {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
]
  },{
    //To show timestamp of 'createdAt' an 'updatedAt'
    timestamps: true
  }
);

//Creating Model with name 'Post' for the schema(postSchema)
const Post = mongoose.model('Post', postSchema);

//Exporting the model to be further used by the parent 'contact.js' file.
module.exports = Post;
