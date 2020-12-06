/* 
    This file is simply meant to be an aggregator of all UserService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createUser = require("./createUser");
const createUserBatch = require("./createUserBatch");
const updateUser = require("./updateUser");
const getSingleUser = require("./getSingleUser");

//* EXPORTS
module.exports = {
  createUser,
  createUserBatch,
  updateUser,
  getSingleUser,
};
