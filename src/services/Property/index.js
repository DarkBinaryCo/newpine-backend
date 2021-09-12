/* 
    This file is simply meant to be an aggregator of all PropertyService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
// Community stuff
const createCommunity = require("./createCommunity");
const getCommunities = require("./getCommunities");
const updateCommunity = require("./updateCommunity");

// Property stuff
const getProperties = require("./getProperties");
const getPropertyGroupTypes = require("./getPropertyGroupTypes");
const getPropertyGroups = require("./getPropertyGroups");
const getPhases = require("./getPhases");
const getPropertyTypes = require("./getPropertyTypes");

//* EXPORTS
module.exports = {
  createCommunity,
  getCommunities,
  updateCommunity,

  getProperties,
  getPropertyGroupTypes,
  getPropertyGroups,
  getPhases,
  getPropertyTypes,
};
