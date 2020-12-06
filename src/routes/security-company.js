const express = require("express");
const router = express.Router();

const {
  PermissionMiddleware,
  SecurityCompanyMiddleware,
  UtilityMiddleware,
} = require("../middleware");

//* SECURITY MANAGER FUNCTIONALITY
// Add security guards
router.post(
  "/manager/security-guards",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.SecurityManagerLoggedIn,
  SecurityCompanyMiddleware.CreateGuardUserAccounts
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

//* EXPORTS
module.exports = router;
