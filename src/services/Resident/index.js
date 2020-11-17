/* 
    This file is simply meant to be an aggregator of all UserService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createResident = require("./createResident");
const getResidentByUserId = require("./getResidentByUserId");
const getResidents = require("./getResidents");
const updateResident = require("./updateResident");
const removeResident = require("./removeResident");

//* EXPORTS
module.exports = {
  createResident,
  getResidentByUserId,
  getResidents,
  updateResident,
  removeResident,
};
