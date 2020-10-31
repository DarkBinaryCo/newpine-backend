// Internal
const getResponse = require('./getResponse');

/** Get an error response
 * @param {String} message The error message to return as part of the response
 * @param {Object<Error>} error The error object containing the error's data
 * @param {Number} statusCode HTTP status code to be returned with this response
 * @return {Object} An API response object
 */
const getError = (message, error, statusCode = 500) => {
    statusCode = statusCode;
    let response = getResponse(false, message, null, statusCode);
    response.error = error;
    return response;
};

//* EXPORTS
module.exports = getError;