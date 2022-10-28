//Importing mongoose library
const mongoose = require('mongoose');

//Creating a schema for the 'post' with attributes 'content' and 'user' having below mentioned properties(importing 'user' attribute from 'User' collection).
const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
  },{
    timestamps: true
  }
);

//Creating Model with name 'Post' for the schema(postSchema)
const Post = mongoose.model('Post', postSchema);

//Exporting the model to be further used by the parent 'contact.js' file.
module.exports = Post;
