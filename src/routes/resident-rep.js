const express = require("express");
const router = express();

const { USER_TYPE } = require("../config/auth");
const { PermissionMiddleware, ResidentMiddleware } = require("../middleware");

// Get the resident owner for a given property
router.get(
  "/resident-owner/:propertyId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT_REP),
  ResidentMiddleware.GetPropertyResidentOwner
);

// Verify residents belonging to a certain property
router.post(
  "/verify/residents/:propertyId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT_REP),
  ResidentMiddleware.VerifyPropertyResidents
);

// Get vehicles belonging to a given property
router.get(
  "/vehicles/:propertyId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT_REP),
  ResidentMiddleware.GetPropertyVehicles
);

// Verify a vehicle
router.post(
  "/verify/vehicle/:vehicleId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT_REP),
  ResidentMiddleware.VerifyVehicle
);

//* EXPORTS
module.exports = router;
