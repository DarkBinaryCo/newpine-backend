/** Prints an API response. Used to return the API response to the client.
 * @param {Object} res Express result. Usually the first parameter in an express middleware function
 * @param {Object} apiResponse An API response generated by the API util. Expects a specific format
 * @param {Function} next A next function, passes over execution to the next middleware if set.
 */
const printResponse = (res, apiResponse, next = null) => {
    res.status(apiResponse.statusCode).json(apiResponse);

    // Only run the next function if an actual function is provided
    if (next && typeof next === 'function') {
        next();
    }
};

//* EXPORTS
module.exports = printResponse;