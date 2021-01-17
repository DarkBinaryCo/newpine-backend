//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
// Services
const { ResidentService, UserService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Update the currently logged in resident */
const updateLoggedInResident = async (req, res, next) => {
  let loggedInResidentData = req.residentData;

  // Request data
  let updateData = req.body.data || {};
  let filter = {
    id: loggedInResidentData.id,
  };

  // Update resident details
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateResident(updateData, filter).then((_) => {
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
