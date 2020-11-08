const _getUserTokenData = require("./_getUserTokenData");

/** [Helper] Only proceeds to the next middleware if a user of the specified user type is logged in based on the AuthToken passed in
 *
 * Also sets user data on the `req.userData` which is passed on any middleware that comes after
 */
const UserLoggedIn = async (req, res, next) => {
  const userTokenData = await _getUserTokenData(req);

  // Move to the next middleware if the user is logged in
  if (userTokenData.loggedIn) {
    // Set userData
    req.userData = userTokenData.tokenData.user;

    next();
  } else {
    // Don't go to next middleware
    console.error(`Permission denied! Not logged in.`);
    return false;
  }
};

//* EXPORTS
module.exports = UserLoggedIn;
