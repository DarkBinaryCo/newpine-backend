const express = require("express");
const router = express.Router();

const {
  PermissionMiddleware,
  AdminMiddleware,
  UtilityMiddleware,
} = require("../middleware");

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
