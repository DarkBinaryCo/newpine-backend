const {
    AuthService
} = require('../../services');

/** [Helper] Get token information and the user that owns the token
 * @param {Object} req The request from a middleware. Should contain a bearer token.
 * @return {Object|null} The token owner if found and null if no owner was found for that token
 */
const _getTokenDataOfUserType = async (req, userTypeIdEntered) => {
    // Set response data defaults ~ returned before we find user
    let responseData = {
        loggedIn: false,
        tokenData: null
    };

    // No need to go further if we don't have any authorization headers provided
    if (!req.headers.authorization) return 'responseData';

    // Get the token
    const token = (req.headers.authorization.split(" "))[1];
    const tokenOwner = await AuthService.getAuthToken(token);

    console.log("Token owner: ", tokenOwner);
    if (!tokenOwner || !tokenOwner.user) return responseData;

    //* Getting here means that we found a token owner
    responseData.loggedIn = tokenOwner.user.userTypeId === userTypeIdEntered;
    responseData.tokenData = tokenOwner;

    return responseData;
}

//* EXPORTS
module.exports = _getTokenDataOfUserType;