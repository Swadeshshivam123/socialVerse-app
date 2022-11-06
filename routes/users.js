//Routes for users.

//Importing expressJS(installed)
const express = require("express");

//Importing "Router()" function of express and storing it in "router" variable
const router = express.Router();

//Importing 'passport'(installed)
//(used for authentication using passport)
const passport = require("passport");

//Checking if "router" is properly loaded or not.
console.log("Users Router loaded.!");

//Importing "home_controller.js" file from "controller" directory
const usersController = require('../controllers/users_controller');

//Middleware for accessing 'profile' section of userController after 'passport.checkAuthentication' is done successfully
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

//Middleware for accessing 'update' section of userController after 'passport.checkAuthentication' is done successfully
router.post('/update/:id', passport.checkAuthentication, usersController.update);

//Middleware for accessing 'signUp' section of userController
router.get('/sign-up', usersController.signUp);

//Middleware for accessing 'signIn' section of userController
router.get('/sign-in', usersController.signIn);

//Middleware for accessing 'create' section of userController
router.post('/create', usersController.create);

//for Authentication using Passport JS('passport-local-strategy' in config directory)
//Using 'passport' as middleware for 'authentication'
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/users/sign-in'},
), usersController.createSession);

//Middleware for accessing 'destroySession' section of userController
router.get("/sign-out", usersController.destroySession);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;
