/* 
    This file is simply meant to be an aggregator of all ResidentMiddleware/vehicles related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AddVehicle = require("./AddVehicle");
const GetResidentVehicles = require("./GetResidentVehicles");
const UpdateVehicle = require("./UpdateVehicle");
const RemoveVehicle = require("./RemoveVehicle");

// Vehicles

//* EXPORTS
module.exports = {
  AddVehicle,
  GetResidentVehicles,
  UpdateVehicle,
  RemoveVehicle,
};
