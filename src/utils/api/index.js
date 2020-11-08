/* 
    This file is simply meant to be an aggregator of all api util related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const getResponse = require("./getResponse");
const getError = require("./getError");
const getUnauthorizedError = require("./getUnauthorizedError");
const attachErrorHandler = require("./attachErrorHandler");
const printResponse = require("./printResponse");

//* EXPORTS
module.exports = {
  getApiResponse: getResponse,
  getApiError: getError,
  getApiUnauthorizedError: getUnauthorizedError,
  attachApiErrorHandler: attachErrorHandler,
  printApiResponse: printResponse,
};
