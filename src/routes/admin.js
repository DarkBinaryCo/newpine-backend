const express = require("express");
const router = express.Router();

const {
  PermissionMiddleware,
  AdminMiddleware,
  UtilityMiddleware,
} = require("../middleware");

// Create a security manager account
router.post(
  "/security-manager",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.AdminLoggedIn,
  AdminMiddleware.AddSecurityManager
);

//* EXPORTS
module.exports = router;
