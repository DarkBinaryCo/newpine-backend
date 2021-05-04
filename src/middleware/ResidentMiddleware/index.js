/* 
    This file is simply meant to be an aggregator of all ResidentMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const ResidentsFunctions = require("./residents");
const ResidentRepresentativeFunctions = require("./representatives");
const VehiclesFunctions = require("./vehicles");
const VisitorsFunctions = require("./visitors");

//* EXPORTS
module.exports = {
  ...ResidentsFunctions,
  ...ResidentRepresentativeFunctions,
  ...VehiclesFunctions,
  ...VisitorsFunctions,
};
