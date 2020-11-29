/* 
    This file is simply meant to be an aggregator of all models
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AuthTokenModels = require("./AuthToken");
const PaymentModels = require("./Payment");
const UserModels = require("./User");
const PropertyModels = require("./Property");
const ResidentModels = require("./Resident");
const VehicleModels = require("./Vehicle");
const VisitorModels = require("./Visitor");

//* EXPORTS
module.exports = {
  ...AuthTokenModels,
  ...PaymentModels,
  ...UserModels,
  ...PropertyModels,
  ...ResidentModels,
  ...VehicleModels,
  ...VisitorModels,
};
