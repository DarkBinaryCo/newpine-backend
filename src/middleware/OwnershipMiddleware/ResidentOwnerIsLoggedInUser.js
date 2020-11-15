//* This middleware must be called after PermissionMiddleware.UserLoggedIn
/** Confirms that the resident */
const loggedInUserIsResidentOwner = async (req, res, next) => {
  let requestData = req.body.data || {};

  // If no insert data was found
  if (!requestData.keys().length) {
    console.error(
      "No insert data was found at `req.body.data`. Ensure you are in a resident route."
    );
    return;
  }

  // Confirm if the resident owner is a valid resident owner for the logged in user.
  let filter = {
    userId: req.userData.id, //? This comes from the UserLoggedIn middleware
    residentOwnerId: null, // Only fetch resident owners
  };
  let residentOwners = await ResidentService.getResidents(filter);
  let residentIds = residentOwners.map((resident) => resident.id);

  // If there are no residents or the residentOwnerId set is not in the list of residentIds
  if (!residentOwners || !residentIds.includes(requestData.residentOwnerId)) {
    let apiResponse = ApiUtil.getUnauthorizedError();
    return ApiUtil.printResponse(res, apiResponse);
  } else {
    next();
  }
};

//* EXPORTS
module.exports = loggedInUserIsResidentOwner;
