// Utils
const { ApiUtil } = require("../../utils");

//! For this file  to work, the user must be logged in (MUST be used after calling the UserLoggedIn middleware
//* This middleware must be called after PermissionMiddleware.UserLoggedIn
// Config
const { USER_TYPE } = require("../../config/auth");

/** Only proceeds to the next middleware if an admin user is logged in based on the `AuthToken` passed in. */
const adminLoggedIn = async (req, res, next) => {
  let userData = req.userData;

  // No point checking if we have the right user type logged in if we have no logged in user data to check
  if (!userData) {
    throw new Error(
      "\nIt would appear the middleware was called before calling UserLoggedIn. Please call the UserLoggedIn middleware before calling this.\n"
    );
  } else if (userData.userTypeId === USER_TYPE.ADMIN) {
    //? Admin is logged in
    next();
  } else {
    let apiResponse = ApiUtil.getUnauthorizedError();
    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = adminLoggedIn;
