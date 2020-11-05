/* 
    This file is simply meant to be an aggregator of all models
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const AuthToken = require("./AuthToken");
const Payment = require("./Payment");
const User = require("./User");

//* EXPORTS
module.exports = {
  ...AuthToken,
  ...Payment,
  ...User,
};
