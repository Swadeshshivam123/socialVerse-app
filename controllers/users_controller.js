//Importing 'user.js' model(database) from 'models' directory.
const User = require("../models/user");

//We'll access this function in "routes/users.js"
module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Users/profile",
  });
};

//Rendering the 'Sign Up' page for user
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "socialVerse | Sign Up",
  });
};

//Rendering the 'Sign In' page for user
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "socialVerse | Sign In",
  });
};

//Getting the 'sign up' data
module.exports.create = function (req, res) {
  
   //Checking if the 'password' and 'confirm-password' entered don't exactly match, redirecting back to the sign-up page.
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
  }

  //Checking the uniqueness of the emailID.
  User.findOne({ email: req.body.email }, function (err, user) {
    
    //Error handling.
    if (err) {
      console.log("Error in finding user in signing up.!");
      return;
    }

    //If the emailID entered for sign-up already exists in the 'User' database, then redirect back to the same page, else, create a user with details available in 'req.body'(obtained from the body-parser) and push the user-data in the database model 'User'.
    if (!user) {
      User.create(req.body, function (err, user) {
        
        //Error handling.
        if (err) {
          console.log("Error in creating a user while signing up.!");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//Getting the 'sign in' data
module.exports.createSession = function (req, res) {
  //To be done later
};
