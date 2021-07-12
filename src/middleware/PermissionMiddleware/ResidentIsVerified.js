//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
// Utils
const { ApiUtil } = require("../../utils");

/** Verify the currently logged in resident */
const residentIsVerified = async (req, res, next) => {
  if (!req.residentData) {
    let responseMessage =
      "It would appear you attempted to verify a resident without first confirming that the resident is logged in. Please call PermissionMiddleware.ResidentLoggedIn before attempting to verify resident.";
    let apiResponse = ApiUtil.getError(responseMessage, {});

    ApiUtil.printResponse(res, apiResponse);
  } else if (req.residentData.isVerified === true) {
    next();
  } else {
    //? Resident is not verified
    let responseMessage =
      "Permission denied! You need to be a verified resident to do that. Please request verification from your resident representative/chairperson.";
    let apiResponse = ApiUtil.getUnauthorizedError(responseMessage);

    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = residentIsVerified;
