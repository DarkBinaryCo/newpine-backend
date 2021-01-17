/* 
    This file is simply meant to be an aggregator of all UserMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const GetIdentificationTypes = require("./GetIdentificationTypes");
const GetUserTypes = require("./GetUserTypes");

const GetLoggedInUser = require("./GetLoggedInUser");
const UpdateLoggedInUser = require("./UpdateLoggedInUser");

//* EXPORTS
module.exports = {
  GetIdentificationTypes,
  GetUserTypes,
  GetLoggedInUser,
  UpdateLoggedInUser,
};
