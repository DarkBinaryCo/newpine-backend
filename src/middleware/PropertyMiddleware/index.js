/* 
    This file is simply meant to be an aggregator of all PropertyMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const GetPhases = require("./GetPhases");
const GetProperties = require("./GetProperties");
const GetPropertyGroups = require("./GetPropertyGroups");
const GetPropertyGroupTypes = require("./GetPropertyGroupTypes");

//* EXPORTS
module.exports = {
  GetPhases,
  GetProperties,
  GetPropertyGroups,
  GetPropertyGroupTypes,
  GetProperties,
};
