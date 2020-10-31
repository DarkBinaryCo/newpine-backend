/* 
    This file is simply meant to be an aggregator of all services
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AuthService = require("./Auth");
const CommService = require("./Comm");
const UploadService = require("./Upload");
const UserService = require("./User");
const UtilityService = require("./Utility");

//* EXPORTS
module.exports = {
  AuthService,
  CommService,
  UploadService,
  UserService,
  UtilityService,
};
