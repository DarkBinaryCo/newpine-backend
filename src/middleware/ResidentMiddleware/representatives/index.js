/* 
    This file is simply meant to be an aggregator of all ResidentMiddleware/representatives related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const GetPropertyResidentOwner = require("./GetPropertyResidentOwner");
const GetPropertyVehicles = require("./GetPropertyVehicles");
const VerifyResidentAccount = require("./VerifyResidentAccount");
const VerifyVehicle = require("./VerifyVehicle");

//* EXPORTS
module.exports = {
  GetPropertyResidentOwner,
  GetPropertyVehicles,
  VerifyResidentAccount,
  VerifyVehicle,
};
