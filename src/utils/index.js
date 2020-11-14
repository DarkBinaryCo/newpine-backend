/* 
    This file is simply meant to be an aggregator of all utils
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const ApiUtil = require("./api");
const AuthUtil = require("./auth");
const DateUtil = require("./date");
const FilterUtil = require("./filter");
const RandomUtil = require("./random");

//* EXPORTS
module.exports = {
  ApiUtil,
  AuthUtil,
  DateUtil,
  FilterUtil,
  RandomUtil,
};
