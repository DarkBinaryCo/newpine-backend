/* 
    This file is simply meant to be an aggregator of all SecurtyCompanyMiddleware/security-manager related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const CreateSecurityGuard = require("./CreateSecurityGuard");
const GetGuards = require("./GetGuards");
const GetSecurityShifts = require("./GetSecurityShifts");
const UpdateGuard = require("./UpdateGuard");
const RemoveGuard = require("./RemoveGuard");

//* EXPORTS
module.exports = {
  CreateSecurityGuard,
  GetSecurityShifts,
  GetGuards,
  UpdateGuard,
  RemoveGuard,
};
