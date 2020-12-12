const express = require("express");
const router = express.Router();

const {
  PermissionMiddleware,
  SecurityCompanyMiddleware,
  UtilityMiddleware,
} = require("../middleware");

//* SECURITY MANAGER FUNCTIONALITY
// Add security guard user accounts
router.post(
  "/manager/security-guard-users",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.CreateGuardUserAccounts
);

// Create a security guard ~ contains extra details about the guards
router.post(
  "/security-guards",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.CreateSecurityGuardBatch
);

// Get security guards
router.get(
  "/manager/security-guards",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.GetGuards
);

// Update security guard
router.patch(
  "/manager/security-guard/:securityGuardId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.UpdateGuard
);

// Remove security guard
router.delete(
  "/manager/security-guard/:securityGuardId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.RemoveGuard
);

//* SECURITY GUARD FUNCTIONALITY

// Create resident checkin
router.post(
  "/guard/resident-checkin",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.CreateResidentCheckin
);

// Create visitor checkin
router.post(
  "/guard/visitor-checkin",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  PermissionMiddleware.VisitorCanCheckin,
  SecurityCompanyMiddleware.CreateVisitorCheckin
);

// Get resident checkins
router.get(
  "/guard/resident-checkins",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.GetResidentCheckins
);

// Get visitor checkins
router.get(
  "/guard/visitor-checkins",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.GetVisitorCheckins
);

// Remove resident checkin
router.delete(
  "/guard/resident-checkin/:checkinId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.RemoveResidentCheckin
);

// Remove visitor checkin
router.delete(
  "/guard/visitor-checkin/:checkinId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.RemoveVisitorCheckin
);

//* EXPORTS
module.exports = router;
