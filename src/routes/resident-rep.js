const express = require("express");
const router = express();

const {
  PermissionMiddleware,
  ResidentMiddleware,
  UtilityMiddleware,
} = require("../middleware");

router.get(
  "/resident/:propertyId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentRepLoggedIn
);

router.get(
  "/vehicles/:propertyId",
  PermissionMiddleware.UserLoggedIn,
  PermissionMiddleware.ResidentRepLoggedIn
);

//* EXPORTS
module.exports = router;
