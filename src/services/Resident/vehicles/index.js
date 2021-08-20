/* 
    This file is simply meant to be an aggregator of all UserService vehicle related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const addVehicle = require("./addVehicle");
const getSingleVehicle = require("./getSingleVehicle");
const getVehicles = require("./getVehicles");
const updateVehicle = require("./updateVehicle");
const removeVehicle = require("./removeVehicle");

//* EXPORTS
module.exports = {
  addVehicle,
  getSingleVehicle,
  getVehicles,
  updateVehicle,
  removeVehicle,
};
