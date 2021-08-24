const express = require("express");
const router = express.Router();

const {
  PermissionMiddleware,
  AdminMiddleware,
  UtilityMiddleware,
  UserMiddleware,
} = require("../middleware");

// Get user types
router.get(
  "/user-types",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  UserMiddleware.GetUserTypes
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
