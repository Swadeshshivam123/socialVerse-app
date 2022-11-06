//User Controller

//Importing 'user.js' model(database) from 'models' directory.
const User = require("../models/user");

//We'll access these functionalities in "routes/users.js"

// For authentication using Passport JS

//As 'passsport.checkAuthentication' is used in the middleware, this 'profile' page of the user will be accessed only when the user is successfully authenticated. In case the user is not signed-in, user will be redirected back to the 'sign-in' page

//These functionalities are handled in 'passport.checkAuthentication' function in the 'passport-local-strategy.js' file from 'config' directory


module.exports.profile = function(req, res){
  User.findById(req.params.id, function(err, user){
      
    //Rendering the 'profile' page of the user with the details of the user
    return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
      });
  });

}

// Updating user's details on the basis of data obtained from the 'user-update-form'
//Using 'async-await'
module.exports.update = async function(req, res){
   
  //Checking if the user requesting for updation is same as the user signed in
  //(Multiple level authentication)
  if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          //Calling the static method 'uploadedAvatar' of 'User' model for reading the request/data of the multipart form
          User.uploadedAvatar(req, res, function(err){
              if (err) {
                //Error Handling
                console.log('*****Multer Error: ', err);
                return;
              }
              
              //Updating user's name and emailID
              user.name = req.body.name;
              user.email = req.body.email;

              //Checking if the request 'req' has a file or not
              if (req.file){
                  //This is saving the path of uploaded file into the avatar field of the user
                  user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              //Now, since 'user' is updated, we'll save it.
              user.save();
              //Redirecting back to th same page after successfully updating 'user-details'.
              return res.redirect('back');
          });

      }catch(err){
        //Flashing 'error' message notification. 
          req.flash('error', err);
          return res.redirect('back');
      }


  }else{
      //Flashing 'error' message notification. 
      req.flash('error', 'Unauthorized!');
      //Rendering 'HTTP 401 request - Unauthorized' page
      return res.status(401).send('Unauthorized');
  }
}


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

//Getting the 'sign up' data and creating a new user for 'socialVerse'.
module.exports.create = function (req, res) {
  //Checking if the 'password' and 'confirm-password' entered don't exactly match, redirecting back to the sign-up page.
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Entered Password and Confirm password do not match!');
    return res.redirect('back');
  }

  //Checking the uniqueness of the emailID.
  User.findOne({ email: req.body.email }, function (err, user) {
    //Error handling.
    if (err) {
      //Flashing 'error' notification
      req.flash('error', err); 
      return;
    }

    //If the emailID entered for sign-up already exists in the 'User' database, then redirect back to the sign-in page, else, create a user with details available in 'req.body'(obtained from the body-parser) and push the user-data in the database model 'User'.
    if (!user) {
      User.create(req.body, function (err, user) {
        //Error handling.
        if (err) {
          //Flashing 'error' notification
          req.flash('error', err);
          return;
        }

        //Redirecing user to sign-in page after successfully signining-up
        return res.redirect("/users/sign-in");
      });
    } else {
      //Flashing 'error' message notification
      req.flash('error', 'EmailID already exists. Sign in to continue!');
      //Redirecting back to the 'sign-up' page if the 'emailID' already exists in the 'User' database model
      return res.redirect("/users/sign-in");
    }
  });
};

//Getting the 'sign in' data(Creating session for the registered user)
//Authentication using 'passport-local'

//Signing in and creating a session for the user
module.exports.createSession = function (req, res) {
  //Session has been created by Passport JS(from the 'passport-local-strategy' file of the 'config' directory)
  //Flashing notification for logging in successfully.
  req.flash('success', 'Logged in successfully');
  //Redirecting back to home page after successfully signing in.
  return res.redirect("/");
};

//Middleware for signing-out the user from his/her account.
module.exports.destroySession = function (req, res, next) {
  // Logging out of user's account.
  //This function is given to 'req' by 'PassportJS'.
  req.logout(function(err) {
    //Error Handling   
    if (err) { 
      return next(err); 
    }
  });
  
  //Flashing notification for logging out successfully.
  req.flash('success', 'You have logged out successfully!');
  //Redirecting back to the 'Home' page after logging out.
  return res.redirect("/");
};
