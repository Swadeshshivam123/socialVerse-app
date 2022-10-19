//Importing express JS(installed)
const express = require('express');

//Importing path(built-in)
const path = require('path');

//Declaring and initializing port no for localhost
const port = 80;

//Calling express and storing it in "app" variable
const app = express();

//Adding middleware to use the "express router" for "home"(primary index router("index.js"))
app.use('/', require('./routes/index'));

//Setting "ejs" as the "view engine"('template engine').
app.set('view engine', 'ejs');

//Specifying "views" to the 'view' directory which contains 'home.ejs' file
app.set('views', './views');









//Displaying and error handling if the server is working fine or not.
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:  ${err}`);
        return;
    }

    console.log(`Yup.! My express server is up and running on port: ${port}`);
})


