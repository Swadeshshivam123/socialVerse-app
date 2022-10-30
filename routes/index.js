//Routes for "home"(primary router)

//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" functionality of express and storing it in "router" variable 
const router = express.Router();

//Checking if "router" is properly loaded or not.
console.log('Home Router loaded.!');

//Importing "home_controller.js" file from "controller" directory
const homeController = require('../controllers/home_controller');

//Middleware for getting access to homeController's 'home' functionality
router.get('/', homeController.home);

//Adding middleware to use the "express router" for "users"(users.js)
router.use('/users', require('./users'));

//Adding middleware to use the "express router" for "posts"(posts.js)
router.use('/posts', require('./post'));

//Adding middleware to use the "express router" for "comments"(comments.js)
router.use('/comments', require('./comments'));

//for any further routes, access from here.
//routes.use('/routerName', require('./routerFile'));



//Exporting "router" to be available for use for the main "index.js" file(if needed)
module.exports = router;