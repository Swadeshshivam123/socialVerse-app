///Parent 'index.js' file for socialVerse

//Importing express JS(installed)
const express = require('express');

//Importing path(built-in)
const path = require('path');

//Declaring and initializing port no for localhost
const port = 80;

//Calling express and storing it in "app" variable
const app = express();

//Importing 'user.js' file from 'models' directory into the collection 'User' to store the user details
const User = require('./models/user');

//Importing 'mongoose.js' file from 'config' folder to connect it to the database
const db = require('./config/mongoose');

//Importing express ejs layouts for 'views'
const expressLayouts = require('express-ejs-layouts');

//Extract 'stylesheets'(css files) and 'scripts'(js files) from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Adding middleware to use the express layout('expressLayouts')
//Must be used before using 'Routes'(because we'll be using these layouts in the routes & controllers, so they must be used first)
app.use(expressLayouts);

//Adding middleware to use the "express router" for "home"(primary index router("index.js"))
app.use('/', require('./routes/index'));

//Setting "ejs" as the "view engine"('template engine').
app.set('view engine', 'ejs');

//Specifying "views" to the 'view' directory which contains 'home.ejs' file
app.set('views', './views');

//Accessing static files like images, css and js files kept in their respective sub-folders inside "assets" folder
app.use(express.static('./assets'));









//Displaying and error handling if the server is working fine or not.
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:  ${err}`);
        return;
    }

    console.log(`Yup.! My express server is up and running on port: ${port}`);
})


