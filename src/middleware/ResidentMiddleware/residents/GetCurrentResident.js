//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
// Utils
const { ApiUtil } = require("../../../utils");

/** Get the currently logged in resident.
 * Currently getting this information from the resident logged in middleware function. No need for multiple calls
 */
const getCurrentResident = (req, res, next) => {
  console.log("resident data: ", req.residentData);

  let apiResponse = ApiUtil.getResponse(
    true,
    "Successfully retrieved the currently logged in resident",
    req.residentData
  );
  ApiUtil.printResponse(res, apiResponse, next);
};

//* EXPORTS
module.exports = getCurrentResident;
