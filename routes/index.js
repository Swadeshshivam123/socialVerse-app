//Routes for "home"

//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" function of express and storing it in "router" variable 
const router = express.Router();

//Checking if "router" is properly loaded or not.
console.log('Home Router loaded.!');

//Importing "home_controller.js" file from "controller" directory
const homeController = require('../controllers/home_controller');

//Middleware for accessing homeController's action
router.get('/', homeController.home);

//Adding middleware to use the "express router" for "users"
router.use('/users', require('./users'));

//Adding middleware to use the "express router" for "posts"s
router.use('/posts', require('./posts'));

//for any further routes, access from here.
//routes.use('/routerName', require('./routerFile'));



//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;