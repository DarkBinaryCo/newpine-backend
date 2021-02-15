/* 
    This file is simply meant to be an aggregator of all middleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AuthMiddleware = require("./AuthMiddleware");
const PermissionMiddleware = require("./PermissionMiddleware");

const AdminMiddleware = require("./AdminMiddleware");
const UserMiddleware = require("./UserMiddleware");
const ResidentMiddleware = require("./ResidentMiddleware");
const SecurityCompanyMiddleware = require("./SecurityCompanyMiddleware");

const OwnershipMiddleware = require("./OwnershipMiddleware");
const UtilityMiddleware = require("./UtilityMiddleware");

const PropertyMiddleware = require("./PropertyMiddleware");

//* EXPORTS
module.exports = {
  AuthMiddleware,
  PermissionMiddleware,
  AdminMiddleware,
  UserMiddleware,
  ResidentMiddleware,
  SecurityCompanyMiddleware,
  OwnershipMiddleware,
  UtilityMiddleware,
  PropertyMiddleware,
};
