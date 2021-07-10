const express = require("express");
const router = express();

const {
  PermissionMiddleware,
  ResidentMiddleware,
  UtilityMiddleware,
} = require("../middleware");

// Get the resident owner for a given property
router.get(
  "/resident/:propertyId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentRepLoggedIn
  //TODO: Add implementation
);

// Verify residents belonging to a certain property
router.post(
  "/verify/residents/:propertyId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentRepLoggedIn,
  ResidentMiddleware.VerifyPropertyResidents
);

// Get vehicles belonging to a given property
router.get(
  "/vehicles/:propertyId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentRepLoggedIn
  // TODO: Add implementation
);

//* EXPORTS
module.exports = router;
