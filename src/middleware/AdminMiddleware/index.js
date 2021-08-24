/* 
    This file is simply meant to be an aggregator of all AdminMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const CreateUser = require("./CreateUser");
const GetUsers = require("./GetUsers");

//* EXPORTS
module.exports = {
  CreateUser,
  GetUsers,
};
