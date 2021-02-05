const express = require("express");
const router = express();

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
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.GetCurrentResident
);

// Create resident
router.post(
  "/",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  ResidentMiddleware.CreateResident
);

// Update the currently logged in resident
router.patch(
  "/",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.UpdateLoggedInResident
);

//? CHECKINS/CHECKOUTS
// Get personal check-ins/check-outs
router.get(
  "/summary",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn
  //TODO: Add implementation
);

//? CO-RESIDENTS
// Add co-resident ~ Alias for create resident with a resident-owner specified (user calling this endpoint)
router.post(
  "/co-resident",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.CreateCoResident
);

// Get a list of co-residents belonging to a resident
router.get(
  "/co-residents",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.GetCoResidentsByOwner
);

// Remove co-resident
router.delete(
  "/co-resident/:residentId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  OwnershipMiddleware.LoggedInUserIsResidentOwner,
  ResidentMiddleware.RemoveCoResident
);

//? VEHICLES
// Add vehicle
router.post(
  "/vehicle",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.AddVehicle
);

// Get vehicles
router.get(
  "/vehicles",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.GetResidentVehicles
);

// Update vehicle
router.patch(
  "/vehicle/:vehicleId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.UpdateVehicle
);

// Remove vehicle
router.delete(
  "/vehicle/:vehicleId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.RemoveVehicle
);

//? VISITOR INVITATIONS
// Invite visitor
router.post(
  "/visitor/invite",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.InviteVisitor
);

// Get currently logged in resident's visitor invitations
router.get(
  "/visitor/invitations",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.GetVisitorInvitations
);

// Revoke visitor invitation
router.delete(
  "/visitor/revoke/:invitationId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentLoggedIn,
  ResidentMiddleware.RevokeVisitorInvitation
);

//* EXPORTS
module.exports = router;
