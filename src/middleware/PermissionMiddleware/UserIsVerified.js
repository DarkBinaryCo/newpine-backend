//* This middleware must be called after PermissionMiddleware.UserLoggedIn
// Utils
const { ApiUtil } = require("../../utils");

/** Verify the currently logged in user */
const userIsVerified = async (req, res, next) => {
  if (!req.userData) {
    let responseMessage =
      "It would appear you attempted to verify a user without first confirming that the user is logged in. Please call PermissionMiddleware.userLoggedIn before attempting to verify user.";
    let apiResponse = ApiUtil.getError(responseMessage, {});

    ApiUtil.printResponse(res, apiResponse);
  } else if (req.userData.isVerified === true) {
    next();
  } else {
    //? User is not verified
    let responseMessage =
      "Permission denied! You need to be a verified user to do that. Please request verification from the appropriate authority.";
    let apiResponse = ApiUtil.getUnauthorizedError(responseMessage);

    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = userIsVerified;
