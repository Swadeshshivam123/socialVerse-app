///Parent 'index.js' file for socialVerse

//THE ORDER IN WHICH THESE LIBRARIES, FUNCTIONS AND MIDDLEWARES ARE CALLED IS VERY-VERY IMPORTANT...!!!

//Importing express JS(installed)
const express = require("express");

//Importing path(built-in)
const path = require("path");

//Importing 'cookie-parser'(installed)
const cookieParser = require("cookie-parser");

//Calling express and storing it in "app" variable
const app = express();

//Declaring and initializing port no for localhost
const port = 195;

//Importing express ejs layouts for 'views'(layout of the pages of socialVerse)
const expressLayouts = require("express-ejs-layouts");

//Importing 'mongoose.js' file from 'config' directory to connect it to the database('socialvers_development') and storing it in variable 'db' to use it further
const db = require("./config/mongoose");

//Importing 'express-session'(installed)
//(used for session cookie)
const session = require("express-session");

//Importing 'passport'(installed)
//(used for authentication using passport)
const passport = require("passport");

//Importing 'passport_local_strategy.js' from 'config' directory and storing it in 'passportLocal'
//(used for authentication using passport-local specifically)
const passportLocal = require("./config/passport-local-strategy");

//Importing 'connect-mongo'(installed) and storing it in 'MongoStore'
//For storing 'session information'(session-cookie) into the database.
//(so that everytime the page is refreshed or the server is reloaded, the session-cookie data doesn't get erased).
//Veersion 3.0.0 installed. Syntax for current version 4.0.0 is different.
//'session' here is taken from the above 'session' acquired from 'express-session'.
const MongoStore = require("connect-mongo")(session);

//Importing 'node-saas-middleware' for SASS(advanced CSS styling)(SCSS).
const saasMiddleware = require('node-sass-middleware');

//Importing 'connect-flash' library(installed) for flashing notifications on certain choosen actions
const flash = require('connect-flash');

//Importing 'middleware.js' from 'config' directory(to send 'flash' 'req' to 'res.locals' to be used in 'views')
const customMware = require('./config/middleware');

//Importing body-parser(installed)
const bodyParser = require("body-parser");

//Importing 'user.js' file from 'models' directory into the collection 'User' to store the user details
const User = require("./models/user");

//Importing 'post.js' file from 'models' directory into the collection 'Post' to store the 'post' details
const Post = require("./models/post");
const { use } = require("passport");

//Using 'saasMiddleware' for all the 'css' files.
//Should be used firstly because others will use it
app.use(saasMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));

//Using bodyParser to encode the data fetched from the form.
//It takes the data sent from the form and parses it into keys and values and updates it into 'req.body'
app.use(bodyParser.urlencoded({ extended: false }));

//For creating and altering cookies and other functionalities
app.use(cookieParser());

//Accessing static files like 'images', 'css', 'scss' and 'js' files kept in their respective sub-directories inside "assets" directory.
app.use(express.static("./assets"));

//Make the 'uploads' path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//Adding middleware to use the express layout('expressLayouts')
//Must be used before using 'Routes'(because we'll be using these layouts in the 'routes' & 'controllers', so they must be used first)
app.use(expressLayouts);

//Extract 'stylesheets'(css files) and 'scripts'(js files) from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Setting "ejs" as the "view engine"('template engine').
app.set("view engine", "ejs");

//Specifying "views" to the 'view' directory(which contains all the '.ejs' files)
app.set("views", "./views");


//Using the 'session cookie'
//Using' mongo store' to store the session-cookie in the database
app.use(
  session({
    name: "sociallVerse",
    //TODO ---> Change the 'secret' before deployment in the production mode
    secret: "BlahBlahBlah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      //Providing the session-time of the cookies.
      //(time after which the cookie expires and the data in the cookie is lost)
      //(generally used when after certain allotted time of inactivity, user gets signed out and needs to sign in again to further access his profile)
      maxAge: 1000 * 60 * 100, //in ms
    },
    //Creating a new instance for MongoStore and then using 'mongoose' which is stored in 'db(imported above) to store the 'session-cookie'
    store: new MongoStore(
      //Provide mongoose-connection as the database 'db'.
      { mongooseConnection: db, autoRemove: "disabled" },
      //Callback function
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//Using 'passport.initialize()'
//It's a middleware that initializes 'Passport'(authentication module)
app.use(passport.initialize());

//Using 'passport.session()'
//It is another middleware that alters the request object and change the 'user' value that is currently the session id (from the client cookie) into the true 'deserialized user object'
//It is equivalent to "app.use(passport.authenticate('session'));" where 'session' refers to the following strategy that is bundled with 'passportJS'.
app.use(passport.session());

//Using 'passport.setAuthenticatedUser'
//This function will automatically get called as a middleware
//It wil check that whether a 'session-cookie' is present or not(for successfully authenticatd user)
app.use(passport.setAuthenticatedUser);

//Using 'flash'.
//Must be used after 'app.use(session)'.
app.use(flash());

//Using 'setFlash' functionality of 'customMware'
//Must be useed after using 'flash()'
app.use(customMware.setFlash);

//Adding middleware to use the "express router" for "home"(primary index router("index.js"))
app.use("/", require("./routes/index"));





//Displaying and error handling if the server is working fine or not.
app.listen(port, function (err) {
  //Callback function
  if (err) {
    console.log(`Error in running the server:  ${err}`);
    return;
  }

  console.log(`Yup.! My express server is up and running on port: ${port}`);
});

// My github repository for socialVerse
//   <--- https://github.com/Swadeshshivam123/socialVerse-app.git  --->
