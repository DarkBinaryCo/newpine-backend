/* 
    This file is simply meant to be an aggregator of all PropertyService community related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createCommunity = require("./createCommunity");
const getCommunities = require("./getCommunities");
const getSingleCommunity = require("./getSingleCommunity");
const updateCommunity = require("./updateCommunity");

//* EXPORTS
module.exports = {
  createCommunity,
  getCommunities,
  getSingleCommunity,
  updateCommunity,
};
