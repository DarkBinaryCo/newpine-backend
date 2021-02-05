/* 
    This file is simply meant to be an aggregator of all ResidentMiddleware/residents related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const CreateResident = require("./CreateResident");
const CreateCoResident = require("./CreateCoResident");
const GetCoResidentsByOwner = require("./GetCoResidentsByOwner");
const GetCurrentResident = require("./GetCurrentResident");
const UpdateLoggedInResident = require("./UpdateLoggedInResident");
const RemoveCoResident = require("./RemoveCoResident");

//* EXPORTS
module.exports = {
  CreateResident,
  CreateCoResident,
  GetCoResidentsByOwner,
  GetCurrentResident,
  UpdateLoggedInResident,
  RemoveCoResident,
};
