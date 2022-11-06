//Importing mongoose library
const mongoose = require("mongoose");

//Importing 'multer'(installed)
const multer = require('multer');

//Importing 'path'(installed)
const path = require('path');

//This is where we'll be storing all the avatars
const AVATAR_PATH = path.join('/uploads/users/avatars');

//Creating a schema for the user with attributes 'email', 'password' and 'name' having below mentioned properties
const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  avatar: {
    type: String
}
}, {
  //To show timestamp of 'createdAt' an 'updatedAt'
  timestamps: true
});

// Defining storage storage for the 'avatars'
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});



//Defining 'static methods(functionalities)' for the user
//'.single('avatar')' here says that only one instance of the file with name 'avatar' will be created(not an array of files)
userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');

//Making 'AVATAR_PATH' publically available
userSchema.statics.avatarPath = AVATAR_PATH;

//Creating Model with name 'User' for the schema(userSchema)
const User = mongoose.model('User', userSchema);

//Exporting the model to be further used by the parent 'contact.js' file(if needed).
module.exports = User;
