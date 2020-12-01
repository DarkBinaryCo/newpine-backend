//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn and OwnershipMiddleware.LoggedInUserIsOwner
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Remove a co-resident - Has to be done by the resident that 'owns' the co-resident */
const removeCoResident = async (req, res, next) => {
  let residentOwnerId = req.residentData.id; //? Currently logged in resident id
  let coResidentId = req.params.residentId;

  let deleteFilter = {
    id: coResidentId,
    residentOwnerId, //? Only delete if they actually belong to the resident logged in
  };

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.removeResident(deleteFilter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully deleted co-resident"
      );
      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = removeCoResident;
