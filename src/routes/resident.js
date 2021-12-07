const express = require("express");
const router = express();

const { USER_TYPE } = require("../config/auth");
const {
  PermissionMiddleware,
  OwnershipMiddleware,
  ResidentMiddleware,
  UtilityMiddleware,
} = require("../middleware");

//? RESIDENTS
// Get the current resident
router.get(
  "/",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.GetCurrentResident
);

// Create resident
router.post(
  "/",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.CreateResident
);

// Update the currently logged in resident
router.patch(
  "/",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.UpdateLoggedInResident
);

//? CHECKINS/CHECKOUTS
// Get personal check-ins/check-outs
router.get(
  "/summary",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  PermissionMiddleware.ResidentLoggedIn
  //TODO: Add implementation
);

//? CO-RESIDENTS
// Add co-resident ~ Alias for create resident with a resident-owner specified (user calling this endpoint)
router.post(
  "/co-resident",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.CreateCoResident
);

// Get a list of co-residents belonging to a resident
router.get(
  "/co-residents",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.GetCoResidentsByOwner
);

// Remove co-resident
router.delete(
  "/co-resident/:residentId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.RemoveCoResident
);

//? VEHICLES
// Add vehicle
router.post(
  "/vehicle",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.AddVehicle
);

// Get vehicles
router.get(
  "/vehicles",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.GetResidentVehicles
);

// Update vehicle
router.patch(
  "/vehicle/:vehicleId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.UpdateVehicle
);

// Remove vehicle
router.delete(
  "/vehicle/:vehicleId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.RemoveVehicle
);

//? VISITOR INVITATIONS
// Invite visitor
router.post(
  "/visitor/invite",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.InviteVisitor
);

// Get currently logged in resident's visitor invitations
router.get(
  "/visitor/invitations",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.GetVisitorInvitations
);

// Revoke visitor invitation
router.delete(
  "/visitor/revoke/:invitationId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.RESIDENT),
  ResidentMiddleware.RevokeVisitorInvitation
);

//* EXPORTS
module.exports = router;
