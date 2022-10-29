//Route for "posts"

//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" function of express and storing it in "router" variable 
const router = express.Router();

//Importing 'passport'(installed)
//(used for authentication using passport)
const passport = require("passport");

//Checking if "router" is properly loaded or not.
console.log("Posts router loaded.!");

//Importing "posts_controller.js" file from "controller" directory
const postsController = require('../controllers/posts_controller');

//Middleware for accessing 'create' functionality of postsController after 'passport.checkAuthentication' is done successfully
router.post('/create', passport.checkAuthentication, postsController.create);

//Middleware for accessing 'destroy' functionality of postsController after 'passport.checkAuthentication' is done successfully
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;