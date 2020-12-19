/* 
    This file is simply meant to be an aggregator of all UtilityMiddleware related functions.
    UtilityMiddleware contains all middleware that could not fit in the other middleware categories.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const GetIdentificationTypes = require("./GetIdentificationTypes");
const GetUserTypes = require("./GetUserTypes");
const RequestDataIsProvided = require("./RequestDataIsProvided");

//* EXPORTS
module.exports = {
  GetIdentificationTypes,
  GetUserTypes,
  RequestDataIsProvided,
};
