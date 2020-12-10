/* 
    This file is simply meant to be an aggregator of all SecurtyCompanyMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const SecurityManagerFunctions = require("./security-managers");
const SecurityGuardFunctions = require("./security-guards");

//* EXPORTS
module.exports = {
  ...SecurityManagerFunctions,
  ...SecurityGuardFunctions,
};
