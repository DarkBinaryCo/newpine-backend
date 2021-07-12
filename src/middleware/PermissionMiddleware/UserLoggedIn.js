// Utils
const { ApiUtil } = require("../../utils");

const _getUserTokenData = require("./_getUserTokenData");

/** [Helper] Only proceeds to the next middleware if a user of the specified user type is logged in based on the AuthToken passed in
 *
 * Also sets user data on the `req.userData` which is passed on any middleware that comes after
 */
const userLoggedIn = async (req, res, next) => {
  const userTokenData = await _getUserTokenData(req);

  // Move to the next middleware if the user is logged in
  if (userTokenData.loggedIn) {
    // Set userData
    req.userData = userTokenData.tokenData.user;

    next();
  } else {
    // User is not logged in ~ show authorization error
    let apiResponse = ApiUtil.getUnauthorizedError();
    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = userLoggedIn;
