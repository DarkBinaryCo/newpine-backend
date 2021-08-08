const express = require("express");
const router = express.Router();

// Middleware
const {
  PermissionMiddleware,
  UserMiddleware,
  UtilityMiddleware,
} = require("../middleware");

//? These are endpoints that can be accessed by any type of logged in user
// Get the currently logged in user's details
router.get(
  "/",
  PermissionMiddleware.UserLoggedIn,
  UserMiddleware.GetLoggedInUser
);

// Update the currently logged in user
router.patch(
  "/",
  PermissionMiddleware.UserLoggedIn,
  UtilityMiddleware.RequestDataIsProvided,
  UserMiddleware.UpdateLoggedInUser
);

//! Possible issue
// Update user
router.patch(
  "/:userId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  UserMiddleware.UpdateUser
);

// Get identification types
router.get(
  "/id-types",
  PermissionMiddleware.UserLoggedIn,
  UserMiddleware.GetIdentificationTypes
);

// Get user types
router.get(
  "/user-types",
  PermissionMiddleware.UserLoggedIn,
  UserMiddleware.GetUserTypes
);

//* EXPORTS
module.exports = router;
