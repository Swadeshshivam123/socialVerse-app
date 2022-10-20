//Importing monggose library
const mongoose = require("mongoose");

//Creating a schema for the user with attributes 'email', 'password' and 'name' having below mentioned properties
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Creating Model with name 'User' for the schema(userSchema)
const User = mongoose.model("User", userSchema);

//Exporting the model to be further used by the parent 'contact.js' file.
module.exports = User;
