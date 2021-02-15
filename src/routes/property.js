const express = require("express");
const router = express();

const { PermissionMiddleware, PropertyMiddleware } = require("../middleware");

//? PROPERTIES
// Get properties by filter
router.get(
  "/phases",
  PermissionMiddleware.UserLoggedIn,
  PropertyMiddleware.GetPhases
);

// Get properties by filter
router.get(
  "/properties",
  PermissionMiddleware.UserLoggedIn,
  PropertyMiddleware.GetProperties
);

// Get properties by filter
router.get(
  "/groups",
  PermissionMiddleware.UserLoggedIn,
  PropertyMiddleware.GetPropertyGroups
);

// Get properties by filter
router.get(
  "/group-types",
  PermissionMiddleware.UserLoggedIn,
  PropertyMiddleware.GetPropertyGroupTypes
);

//* EXPORTS
module.exports = router;
