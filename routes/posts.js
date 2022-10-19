//Route for "posts"

//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" function of express and storing it in "router" variable 
const router = express.Router();

//Checking if "router" is properly loaded or not.
console.log("Posts router loaded.!");

//Importing "posts_controller.js" file from "controller" directory
const postsController = require("../controllers/posts_controller");

//Middleware for accessing postsController's action
router.get('/addpost', postsController.addpost);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;