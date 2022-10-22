///Parent 'index.js' file for socialVerse

//THE ORDER IN WHICH THESE LIBRARIES, FUNCTIONS AND MIDDLEWARES ARE CALLED IS VERY-VERY IMPORTANT...!!!

//Importing express JS(installed)
const express = require("express");

//Importing path(built-in)
const path = require("path");

//Importing 'cookie-parser'(installed)
const cookieParser = require("cookie-parser");

//Importing body-parser(installed)
const bodyParser = require("body-parser");

//Declaring and initializing port no for localhost
const port = 82;

//Calling express and storing it in "app" variable
const app = express();

//Importing 'user.js' file from 'models' directory into the collection 'User' to store the user details
const User = require("./models/user");

//Importing 'mongoose.js' file from 'config' folder to connect it to the database
const db = require("./config/mongoose");

//Importing 'express-session'(installed)
//(used for session cookie)
const session = require("express-session");

//Importing 'passport'(installed)
//(used for authentication using passport)
const passport = require("passport");

//Importing 'passport_local_strategy.js' from 'config' directory and storing it in 'LocalStrategy'
//(used for authentication using passport-local specifically)
const LocalStrategy = require("./config/passport-local-strategy");

//Importing express ejs layouts for 'views'
const expressLayouts = require("express-ejs-layouts");

//Extract 'stylesheets'(css files) and 'scripts'(js files) from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Using bodyParser to encode the data fetched from the form.
//First middleware
//It takes the data sent from the form and parses it into keys and values and updates it into req.body
app.use(bodyParser.urlencoded({ extended: false }));

//For creating and altering cookies and other functionalities
app.use(cookieParser());

//Adding middleware to use the express layout('expressLayouts')
//Must be used before using 'Routes'(because we'll be using these layouts in the routes & controllers, so they must be used first)
app.use(expressLayouts);

//Setting "ejs" as the "view engine"('template engine').
app.set("view engine", "ejs");

//Specifying "views" to the 'view' directory which contains 'home.ejs' file
app.set("views", "./views");

//Using the 'session cookie'
app.use(
  session({
    name: "sociallVerse",
    //TODO ---> Change the secret before deployment in the production mode
    secret: "BlahBlahBlah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      //Providing the session-time of the cookies.
      //(time after which the cookie expires and the data in the cookie is lost)
      //(generally used when after certain allotted time of inactivity, user gets signed out and needs to sign in again to further access his profile)
      maxAge: 1000 * 60 * 100,
    },
  })
);

//Using 'passport.initialize()'
app.use(passport.initialize());

//Using 'passport.session()'
app.use(passport.session());

//Using 'passport.setAuthenticatedUser'
//This function will automatically get called as a middleware
//It wil check that whether a 'session-cookie' is present or not(for successfully authenticatd user)
app.use(passport.setAuthenticatedUser);

//Adding middleware to use the "express router" for "home"(primary index router("index.js"))
app.use("/", require("./routes/index"));

//Accessing static files like images, css and js files kept in their respective sub-folders inside "assets" folder
app.use(express.static("./assets"));

//Displaying and error handling if the server is working fine or not.
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:  ${err}`);
    return;
  }

  console.log(`Yup.! My express server is up and running on port: ${port}`);
});



// My github repository for socialVerse
//   <--- https://github.com/Swadeshshivam123/socialVerse-app.git  --->