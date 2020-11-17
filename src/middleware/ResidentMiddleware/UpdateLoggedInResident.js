//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
// Services
const { ResidentService, UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Update the currently logged in resident */
const updateLoggedInResident = async (req, res, next) => {
  let loggedInResidentData = req.residentData;

  // Request data
  let requestData = req.body.data || {};
  let residentUpdateData = requestData.resident || {};
  let userUpdateData = requestData.user || {};

  let userUpdateFilter = {
    id: loggedInResidentData.userId,
  };

  let residentUpdateFilter = {
    id: loggedInResidentData.id,
  };

  // Update resident user details first before attempting to update the resident
  await UserService.updateUser(userUpdateData, userUpdateFilter);

  // Update resident details
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateResident(
      residentUpdateData,
      residentUpdateFilter
    ).then((residentUpdated) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully updated resident"
      );
      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = updateLoggedInResident;
