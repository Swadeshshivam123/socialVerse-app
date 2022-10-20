//Routes for users.

//Importing expressJS(installed)
const express = require('express');

//Importing "Router()" function of express and storing it in "router" variable 
const router = express.Router();

//Checking if "router" is properly loaded or not.
console.log('Users Router loaded.!');

//Importing "home_controller.js" file from "controller" directory
const usersController = require('../controllers/users_controller');

//Middleware for accessing 'profile' section of userController
router.get('/profile', usersController.profile);

//Middleware for accessing 'signUp' section of userController
router.get('/sign-up', usersController.signUp);

//Middleware for accessing 'signIn' section of userController
router.get('/sign-in', usersController.signIn);

//Middleware for accessing 'create' section of userController
router.post('/create', usersController.create);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;