const express = require("express");
const router = express.Router();

// Middleware
const {
  PermissionMiddleware,
  AdminMiddleware,
  UtilityMiddleware,
  UserMiddleware,
} = require("../middleware");

// Filters
const { UserFilter } = require("../filters");

// Get user types
router.get(
  "/user-types",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  UserMiddleware.GetUserTypes
);

// Get users
router.get(
  "/users",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  UserFilter.AdminEditableUsers,
  AdminMiddleware.GetUsers
);

// Update a specific user account
router.patch(
  "/user/:userId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  UserFilter.AdminEditableUsers,
  UserMiddleware.UpdateUser
);

// Create a user account
//? Any account created by an admin is automatically verified
router.post(
  "/user/:userTypeId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  AdminMiddleware.CreateUser
);

//* EXPORTS
module.exports = router;
