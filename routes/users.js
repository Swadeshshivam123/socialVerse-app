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
const usersController = require("../controllers/users_controller");

//Middleware for accessing 'profile' section of userController after 'passport.checkAuthentication' is done successfully
router.get("/profile", passport.checkAuthentication, usersController.profile);

//Middleware for accessing 'signUp' section of userController
router.get("/sign-up", usersController.signUp);

//Middleware for accessing 'signIn' section of userController
router.get("/sign-in", usersController.signIn);

//Middleware for accessing 'create' section of userController
router.post("/create", usersController.create);

//For Manual Authentication

// //Middleware for accessing 'createSession' section of userController
// router.post('/create-session', usersController.createSession);

//for Authentication using Passport JS

//USing 'passport' as middleware for 'authentication'
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

//Middleware for accessing 'signOut' section of userController
router.post("/sign-out", usersController.signOut);

//Exporting "router" to be available for use for the main "index.js" file
module.exports = router;
