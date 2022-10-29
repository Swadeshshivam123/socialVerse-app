//Importing 'user.js' model(database) from 'models' directory.
const { request } = require("express");
const User = require("../models/user");

//We'll access these functions in "routes/users.js"

// For authentication using Passport JS

//As 'passsport.checkAuthentication' is used in the middleware, this 'profile' page of the user will be accessed only when the user is successfully authenticated. In case the user is not signed-in, user will be redirected back to the 'sign-in' page
//These functionalities are handled in 'passport.checkAuthentication' function in the 'passport-local-strategy.js' file from 'config' directory
module.exports.profile = function (req, res) {
  //Rendering the 'profile' page of the user with the details of the user

  User.findById(req.params.id, function(err, user){
    if(err){
      console.log('Error in finding the iuser on User database.!');
      return;
    }

    return res.render("user_profile", {
      title: "User profile",
      profile_user: user
    });
  });
};

// Updating user's details on the basis of data obtained from the 'user-update-form'
module.exports.update = function(req, res){
  //Checking if tht user requesting for updation is same as the user signed in
  if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
      //Error Handling
      if(err){
        console.log('Error in finding the user in USer database.!');
        return;
      }
      //Updating user's data with new details and redirecting back to the same page.
      return res.redirect('back');
    });
  }
  //Else, throw an http '401-Unauthorized' error.
  else{
    return res.status(401).send('Unauthorized');
  }
};


//Rendering the 'Sign Up' page for user
module.exports.signUp = function (req, res) {
  
  //Restricting the access to sign-up page if the user is already signed in(successfully authenticated). Redirecting back to user's profile page in this case.
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  
  return res.render("user_sign_up", {
    title: "socialVerse | Sign Up",
  });
};

//Rendering the 'Sign In' page for user
module.exports.signIn = function (req, res) {
  
  //Restricting the access to sign-in page if the user is already signed in(successfully authenticated). Redirecting back to user's profile page in this case.
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  
  return res.render("user_sign_in", {
    title: "socialVerse | Sign In",
  });
};

//Getting the 'sign up' data(Creating the user)
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

        //Redirecing user to sign-in page after successfully signining-up
        return res.redirect("/users/sign-in");
      });
    } else {
      //Redirecting back to the 'sign-up' page if the 'emailID' already exists in the 'User' database model
      return res.redirect("back");
    }
  });
};

//Getting the 'sign in' data(Creating session for the registered user)
//Authentication using 'passport-local'

//Signing in and creating a session for the user
module.exports.createSession = function (req, res) {
  //Session has been created by Passport JS(from the 'passport_local_strategy' file of the 'config' directory)
  return res.redirect("/users/profile");
};

//<iddleware for signing-out the user from his/her account.
module.exports.destroySession = function (req, res, next) {
  // Logging out user's account.
  //This function is given to 'req' by 'PassportJS'.
  req.logout(function(err) {
    //Error Handling   
    if (err) { 
      return next(err); 
    }
  });

  //Redirecting back to the 'Home' page after logging out.
  return res.redirect("/");
};
