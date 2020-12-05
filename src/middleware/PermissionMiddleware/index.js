/* 
    This file is simply meant to be an aggregator of all PermissionMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AdminLoggedIn = require("./AdminLoggedIn");
const UserLoggedIn = require("./UserLoggedIn");
const ResidentLoggedIn = require("./ResidentLoggedIn");
const SecurityManagerLoggedIn = require("./SecurityManagerLoggedIn");

//* EXPORTS
module.exports = {
  AdminLoggedIn,
  UserLoggedIn,
  ResidentLoggedIn,
  SecurityManagerLoggedIn,
};
