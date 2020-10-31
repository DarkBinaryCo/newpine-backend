const _getTokenDataOfUserType = require('./_getTokenDataOfUserType');

/** [Helper] Only proceeds to the next middleware if a user of the specified user type is logged in based on the AuthToken passed in 
 * 
 * Also sets user data on the `req.userData` which is passed on any middleware that comes after
 */
const UserLoggedIn = async (req, _, next) => {
    const {
        authData
    } = req;

    const {
        userTypeId,
        userTypeTitle
    } = authData;

    const userTokenData = await _getTokenDataOfUserType(req, userTypeId);

    // Unset the auth data from the request
    req.authData = undefined;

    // Move to the next middleware if the user is logged in
    if (userTokenData.loggedIn) {
        console.info(`Success! Logged in as '${userTypeTitle}'`);

        // Set userData
        req.userData = userTokenData.tokenData.user;
        next();
    } else { // Don't go to next middleware
        console.error(`Permission denied! Not a logged in '${userTypeTitle}'`);
        return false;
    }
};

//* EXPORTS
module.exports = UserLoggedIn;