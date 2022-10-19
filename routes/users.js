//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" function of express and storing it in "router" variable 
const router = express.Router();

//Checking if "router" is properly loaded or not.
console.log('Users Router loaded.!');

//Importing "home_controller.js" file from "controller" directory
const usersController = require('../controllers/users_controller');

//Middleware for accessing homeController's action
router.get('/profile', usersController.profile);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;