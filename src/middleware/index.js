/* 
    This file is simply meant to be an aggregator of all middleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AuthMiddleware = require("./AuthMiddleware");
const PermissionMiddleware = require("./PermissionMiddleware");
const ResidentMiddleware = require("./ResidentMiddleware");
const OwnershipMiddleware = require("./OwnershipMiddleware");

//* EXPORTS
module.exports = {
  AuthMiddleware,
  PermissionMiddleware,
  ResidentMiddleware,
  OwnershipMiddleware,
};
