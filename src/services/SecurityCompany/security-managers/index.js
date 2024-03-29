/* 
    This file is simply meant to be an aggregator of all SecurityCompanyService/security-managers related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createSecurityGuard = require("./createSecurityGuard");
const getSecurityGuards = require("./getSecurityGuards");
const getSingleSecurityGuard = require("./getSingleSecurityGuard");
const getSecurityShifts = require("./getSecurityShifts");
const updateSecurityGuard = require("./updateSecurityGuard");
const removeSecurityGuard = require("./removeSecurityGuard");

//* EXPORTS
module.exports = {
  createSecurityGuard,
  getSecurityGuards,
  getSingleSecurityGuard,
  getSecurityShifts,
  updateSecurityGuard,
  removeSecurityGuard,
};
