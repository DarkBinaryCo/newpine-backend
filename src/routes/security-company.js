const express = require("express");
const router = express.Router();

const { USER_TYPE } = require("../config/auth");

// Middleware
const {
  PermissionMiddleware,
  SecurityCompanyMiddleware,
  UserMiddleware,
  UtilityMiddleware,
} = require("../middleware");

// Filters
const { UserFilter } = require("../filters");

//* SECURITY MANAGER FUNCTIONALITY
// Create multiple security guards ~ contains extra details about the guards ie. shift
router.post(
  "/manager/security-guard",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  SecurityCompanyMiddleware.CreateSecurityGuard
);

// Get security shifts
router.get(
  "/manager/security-shifts",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  SecurityCompanyMiddleware.GetSecurityShifts
);

// Get security guards
router.get(
  "/manager/security-guards",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  SecurityCompanyMiddleware.GetGuards
);

// Update user
router.patch(
  "/manager/security-guard/user/:userId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  UserFilter.SecurityGuardOnly,
  UserMiddleware.UpdateUser
);

// Update security guard
router.patch(
  "/manager/security-guard/:securityGuardId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  SecurityCompanyMiddleware.UpdateGuard
);

// Remove security guard
router.delete(
  "/manager/security-guard/:securityGuardId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_MANAGER),
  SecurityCompanyMiddleware.RemoveGuard
);

//* SECURITY GUARD FUNCTIONALITY

// Checkin an individual
router.post(
  "/guard/checkin",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_GUARD),
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.CreateCheckin
);

// Get resident checkins
router.get(
  "/guard/resident-checkins",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_GUARD),
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.GetResidentCheckins
);

// Get visitor checkins
router.get(
  "/guard/visitor-checkins",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_GUARD),
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.GetVisitorCheckins
);

// Remove resident checkin
router.delete(
  "/guard/resident-checkin/:checkinId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_GUARD),
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.RemoveResidentCheckin
);

// Remove visitor checkin
router.delete(
  "/guard/visitor-checkin/:checkinId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.SECURITY_GUARD),
  PermissionMiddleware.SecurityGuardLoggedIn,
  SecurityCompanyMiddleware.RemoveVisitorCheckin
);

//* EXPORTS
module.exports = router;
