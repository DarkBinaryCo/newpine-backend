/* 
    This file is simply meant to be an aggregator of all PropertyService properties
     related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const getPhases = require("./getPhases");

const createPropertyBatch = require("./createPropertyBatch");
const getProperties = require("./getProperties");

const getPropertyGroups = require("./getPropertyGroups");

const getPropertyGroupTypes = require("./getPropertyGroupTypes");

const getPropertyTypes = require("./getPropertyTypes");

//* EXPORTS
module.exports = {
  getPhases,

  createPropertyBatch,
  getProperties,

  getPropertyGroups,

  getPropertyGroupTypes,

  getPropertyTypes,
};
