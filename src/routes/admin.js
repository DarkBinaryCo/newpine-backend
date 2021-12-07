const express = require("express");
const router = express.Router();

// Config
const { USER_TYPE } = require("../config/auth");

// Middleware
const {
  PermissionMiddleware,
  AdminMiddleware,
  UtilityMiddleware,
  UserMiddleware,
  PropertyMiddleware,
} = require("../middleware");

// Filters
const { UserFilter } = require("../filters");

// Get user types
router.get(
  "/user-types",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  UserMiddleware.GetUserTypes
);

// Get users
router.get(
  "/users",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  UserFilter.AdminEditableUsers,
  AdminMiddleware.GetUsers
);

// Update a specific user account
router.patch(
  "/user/:userId",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  UserFilter.AdminEditableUsers,
  UserMiddleware.UpdateUser
);

// Create a user account
//? Any account created by an admin is automatically verified
router.post(
  "/user/:userTypeId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  AdminMiddleware.CreateUser
);

//* Community stuff
//
router.get(
  "/communities",
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  AdminMiddleware.GetCommunities
);

//
router.post(
  "/community",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  AdminMiddleware.CreateCommunity
);

//
router.patch(
  "/community/:communityId",
  UtilityMiddleware.RequestDataIsProvided,
  PermissionMiddleware.UserLoggedIn(USER_TYPE.ADMIN),
  AdminMiddleware.UpdateCommunity
);

//* Property stuff
router.post(
  "/properties/:communityId",
  UtilityMiddleware.RequestDataIsProvided,
  PropertyMiddleware.CreatePropertyBatch
);
//* EXPORTS
module.exports = router;
