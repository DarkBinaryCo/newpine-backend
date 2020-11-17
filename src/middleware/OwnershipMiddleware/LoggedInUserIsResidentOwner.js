//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
// Utils
const { ApiUtil } = require("../../utils");

/** Confirms that the resident */
const loggedInUserIsResidentOwner = async (req, res, next) => {
  let residentData = req.residentData;

  // If the resident does not have an owner, they are the owner
  if (residentData.residentOwnerId === null) {
    next();
  } else {
    // The resident is not an owner
    let apiResponse = ApiUtil.getUnauthorizedError(
      "Permission denied! Non-owners are not allowed to perform this action"
    );
    ApiUtil.printResponse(res, apiResponse, next);
  }
};

//* EXPORTS
module.exports = loggedInUserIsResidentOwner;
