// Internal
const getError = require("./getError");

/** Get an error response
 * @param {String} message The error message to return as part of the response
 * @param {Object<Error>} error The error object containing the error's data
 * @return {Object} An API response object
 */
const getUnauthorizedError = (
  message = "Permission denied! You are not authorized to do that.",
  error = Error("Permission denied! You are not authorized to do that.")
) => {
  let response = getError(message, error, 401);
  response.error = error;
  return response;
};

//* EXPORTS
module.exports = getUnauthorizedError;
