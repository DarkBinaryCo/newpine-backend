/** Get an API response
 * @param {String} message Message to return as part of the response
 * @param {Object} data An object representing data returned as part of the API response. Default: `null`
 * @param {Number} statusCode HTTP status code to be returned with this response. Default: `200`
 * @return {Object} An API response object
 */
const getResponse = (ok, message, data = null, statusCode = 200) => {
    let response = {
        ok,
        message,
        data,
        statusCode
    };

    return response;
};

//* EXPORTS
module.exports = getResponse;