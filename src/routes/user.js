const express = require("express");
const router = express.Router();

// Middleware
const { PermissionMiddleware, UtilityMiddleware } = require("../middleware");

//? These are endpoints that can be accessed by any type of logged in user
//* GENERAL
// Get identification types
router.get(
  "/id-types",
  PermissionMiddleware.UserLoggedIn,
  UtilityMiddleware.GetIdentificationTypes
);

// Get user types
router.get(
  "/user-types",
  PermissionMiddleware.UserLoggedIn,
  UtilityMiddleware.GetUserTypes
);

//* EXPORTS
module.exports = router;
