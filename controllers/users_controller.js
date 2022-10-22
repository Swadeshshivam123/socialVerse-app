//Importing 'user.js' model(database) from 'models' directory.
const User = require("../models/user");

//We'll access these functions in "routes/users.js"

//For Manual Authentication strategy

// module.exports.profile = function (req, res) {

//   //Checking if the user is successfully authenticated or not. If yes, pnly then he/she will be able to accss the profile page.
//   if(req.cookies.user_id){

//     User.findById(req.cookies.user_id, function(err, user){

//       //Error Handling
//       if(err){
//         console.log('Error in finding the user for accessing the profile.!');
//         return;
//       }

//       //If the user is signed-in(successfully authenticated)
//       if(user){

//         //Rendering the 'profile' page of the user with the details of the user
//         res.render("user_profile", {
//           title: "User profile",
//           user: user
//         });
//       }

//       //If the user is not signed in(failed authentication or someone incorrectly changed the cookies data from the browser), then redirecting back to 'sign-in' page for authenticatig the user
//       else{
//         return res.redirect('/users/sign-in');
//       }
//     });
//     }

//   //If the user is not signed in(successfully authenticated), redirecting back to the sign-in page
//   else{
//       return res.redirect('/users/sign-in');
//   }

// };

// For authentication using Passport JS

//As 'passsport.checkAuthentication' is used in the middleware, this 'profile' page of the user will be accessed only when the user is successfully authenticated. In case the user is not signed-in, user will be redirected back to the 'sign-in' page
//These functionalities are handled in 'passport.checkAuthentication' function in the 'passport-local-strategy.js' file from 'config' directory
module.exports.profile = function (req, res) {
  //Rendering the 'profile' page of the user with the details of the user
  return res.render("user_profile", {
    title: "User profile",
    user: req.user,
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

//Manual Authentication

// module.exports.createSession = function (req, res) {
//   //Steps to authenticate

//   //Finding the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     //Error Handling
//     if (err) {
//       console.lof("Error in finding the user while signing in.!");
//       return;
//     }

//     //Handling user found
//     if (user) {
//       //Handle password mismatching condition
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }

//       //Handling session creation(in case of NO password mismatch)

//       //Storing the user id in the cookie
//       res.cookie("user_id", user.id);

//       //Redirecting to the user's profile page after successful authentication
//       res.redirect("/users/profile");
//     } else {
//       //Handling user NOT found(Authentication failed as the 'emailId' entered doesn't exist in 'User' database model)
//       //redirecting the user back to the 'sign-in' page
//       return res.redirect("back");
//     }
//   });
// };

//Authentication using 'passport-local'

//Signing in and creating a session for the user
module.exports.createSession = function (req, res) {
  //Session has been created by Passport JS(from the 'passport_local_strategy' file of the 'config' directory)
  return res.redirect("/users/profile");
};

module.exports.signOut = function (req, res) {
  req.clearCookie("user_id");
  return res.redirect("/users/sign-in");
};
