//Using Passport JS for authentication with NodeJS in 'socialVerse'

//Importing 'passport' middleware(installed)
const passport = require("passport");

//Importing 'passport-local'(installed) and acquiring its 'Strategy' functionality in 'LocalStrategy'
const LocalStrategy = require("passport-local").Strategy;

//Importing 'User' database
const User = require("../models/user");

//Authentication(sign-in) using 'passport'(local-strategy)

//Process of Authentication using 'passport-local-strategy'

//               1. Find the user by the 'emailID' inserted and signing-in
//               2. Serialize the user to decide which 'key' is to be kept in 'cookies'
//               3. Deserializing the user from the 'key' in the 'cookies'

//1. Find the user by the 'emailID' inserted and signing-in
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //'done' here is the callback function for 'passport.use()'

      //Find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        //Error Handling
        if (err) {
          console.lof(
            "Error in finding the user in the database while signing in ---> Passport"
          );
          return done(err);
        }

        //Checking if user is not present in the database or if the 'email' of the user matches but the password entered is incorrect
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        //If the user is found, then we return the user
        return done(null, user);
      });
    }
  )
);

//2. Serializing the user to decide which 'key' is to be kept in 'cookies'
//(sending 'user_id' from the browser to the server through the 'coookies'('Serialization'))
passport.serializeUser(function (user, done) {
  //Storing the 'user_id' in encrypted form inside the 'cookies'.
  //'passport.serializeUser()' automatically encrypts the 'user_id'
  done(null, user.id);
});

//3. Deserializing the user from the 'key' in the 'cookies'
//(when the browser makes the request, the server sends back the 'user_id'('Deserialization'))
passport.deserializeUser(function (id, done) {
  //Finding user by 'id' in the database
  User.findById(id, function (err, user) {
    //Error Handling
    if (err) {
      console.lof(
        "Error in finding the user in the database while signing in ---> Passport"
      );
      return done(err);
    }

    //If the user is found, then we return the user
    return done(null, user);
  });
});

//Checking if the user is authenticated successfully
//We'll be using this function as a 'middleware' to check if the user is signed in or not
passport.checkAuthentication = function (req, res, next) {
  //If the user is authenticated successfully, pass on the request to the next function
  if (req.isAuthenticated()) {
    return next();
  }

  //If the user is not signed-in(or authentication failed), then redirect back to the 'sign-in' page
  else {
    return res.redirect("/users/sign-in");
  }
};

// Middleware for setting up the successfully authenticated user
passport.setAuthenticatedUser = function (req, res, next) {
  //If the user is authenticated,
  if (req.isAuthenticated()) {
    //'req.user' contains the current signed in user from the 'session-cookie' and we're just sending this to the locals for the views
    res.locals.user = req.user;
    //Now we can access any 'user' related information in the 'views' directory
  }
  next();
};

//Exporting 'passport' to the parent 'index.js' file if needed for further use
module.exports = passport;
