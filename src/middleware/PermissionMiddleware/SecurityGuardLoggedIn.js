//! For this file  to work, the user must be logged in (MUST be used after calling the UserLoggedIn middleware
//* This middleware must be called after PermissionMiddleware.UserLoggedIn
// Utils
const { ApiUtil } = require("../../utils");

// Config
const { USER_TYPE } = require("../../config/auth");

// Services
const { SecurityCompanyService } = require("../../services");

/** Only proceeds to the next middleware if an admin user is logged in based on the `AuthToken` passed in. */
const adminLoggedIn = async (req, res, next) => {
  let userData = req.userData;

  // No point checking if we have the right user type logged in if we have no logged in user data to check
  if (!userData) {
    throw new Error(
      "\nIt would appear the middleware was called before calling UserLoggedIn. Please call the UserLoggedIn middleware before calling this.\n"
    );
  } else if (userData.userTypeId === USER_TYPE.SECURITY_GUARD) {
    //? Security guard is logged in - find out if they have a guard account

    let securityGuardFound = await SecurityCompanyService.getSingleSecurityGuard(
      { userId: userData.id }
    );

    // Resident belonging to the currently logged in user was found ~ pass the data to the next middleware
    if (securityGuardFound) {
      // Set the security guard data as part of the request passed on to the next middleware
      req.securityGuardData = securityGuardFound;
      next();
    } else {
      // Security guard was not found
      console.error(
        `\nCould not find a security guard account belonging to that user (${userData.id}).`
      );
      let apiResponse = ApiUtil.getResponse(
        false,
        "Security guard account for that user could not be found.\nPlease create the security guard before attempting to access resident functionality.",
        { isNew: true } //? Passing this to inform the user that this is a new account
      );

      ApiUtil.printResponse(res, apiResponse, next);
    }
  } else {
    let apiResponse = ApiUtil.getUnauthorizedError();
    ApiUtil.printResponse(res, apiResponse, next);
  }
};

//* EXPORTS
module.exports = adminLoggedIn;
