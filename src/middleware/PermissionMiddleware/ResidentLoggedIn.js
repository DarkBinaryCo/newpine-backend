//* This middleware must be called after PermissionMiddleware.UserLoggedIn
const { USER_TYPE } = require("../../config/auth");

// Services
const { ResidentService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Only proceeds to the next middleware if an admin user is logged in based on the `AuthToken` passed in. */
const residentLoggedIn = async (req, res, next) => {
  let userData = req.userData;

  // No point checking if we have the right user type logged in if we have no logged in user data to check
  if (!userData) {
    throw new Error(
      "\nIt would appear the middleware was called before calling UserLoggedIn. Please call the UserLoggedIn middleware before calling this.\n"
    );
  } else if (userData.userTypeId === USER_TYPE.RESIDENT) {
    // Resident is logged in
    let residentFound = await ResidentService.getSingleResident({
      userId: userData.id,
    });

    // Resident belonging to the currently logged in user was found ~ pass the data to the next middleware
    if (residentFound) {
      // Set the resident data as part of the request passed on to the next middleware
      req.residentData = residentFound;
      next();
    } else {
      // Resident was not found
      console.error(
        `\nCould not find a resident account belonging to that user (${userData.id}).`
      );
      let apiResponse = ApiUtil.getResponse(
        false,
        "Resident account for that user could not be found. Please create the resident before attempting to access resident functionality.",
        { isNew: true } //? Passing this to inform the user that this is a new account
      );

      ApiUtil.printResponse(res, apiResponse);
    }
  } else {
    let apiResponse = ApiUtil.getUnauthorizedError();
    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = residentLoggedIn;
