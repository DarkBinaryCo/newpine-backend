//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Adds a vehicle to the account of the currently logged in resident */
const addVehicle = (req, res, next) => {
  let vehicleData = req.body.data || {};

  // Set the resident ID to the currently logged in resident
  vehicleData.residentId = req.residentData.id;
  vehicleData.communityId = req.userData.communityId;

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.addVehicle(vehicleData).then((vehicleAdded) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully added vehicle",
        vehicleAdded,
        201
      );
      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = addVehicle;
