// Utils
const { ApiUtil } = require("../../utils");

const _getUserTokenData = require("./_getUserTokenData");

/** [Helper] Only proceeds to the next middleware if a user of the specified user type is logged in based on the AuthToken passed in
 * @param {Number | Array<Number>} authorizedUserTypes The id of the authorized user types
 * Also sets user data on the `req.userData` which is passed on any middleware that comes after
 */
const userLoggedIn = (authorizedUserTypes = null) => {
  return async (req, res, next) => {
    const userTokenData = await _getUserTokenData(req);
    console.log("Checking if user is logged in: ", userTokenData);
    // Move to the next middleware if the user is logged in
    if (userTokenData.loggedIn) {
      req.userData = userTokenData.tokenData.user;

      //* Getting here means we need to restrict the user's access by type
      const currentUserType = req.userData.userTypeId;
      const authorizedUserTypesIsArray = !!authorizedUserTypes?.length;

      //
      const userIsAuthorized = authorizedUserTypesIsArray
        ? authorizedUserTypes.includes(currentUserType)
        : currentUserType === authorizedUserTypes;

      //
      if (!authorizedUserTypes || userIsAuthorized) {
        next();
      } else {
        // User is not logged in to an account with sufficient permissions
        ApiUtil.printResponse(res, ApiUtil.getUnauthorizedError());
      }
    } else {
      // User is not logged in ~ show authorization error
      ApiUtil.printResponse(res, ApiUtil.getUnauthorizedError());
    }
  };
};

//* EXPORTS
module.exports = userLoggedIn;
