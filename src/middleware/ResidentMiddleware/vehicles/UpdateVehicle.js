//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Update a vehicle */
const updateVehicle = (req, res, next) => {
  let updateData = req.body.data || {};
  let updateFilter = {
    id: req.params.vehicleId,
    residentId: req.residentData.id,
  };

  // De-activate vehicle when the user updates it
  updateData.isVerified = false;

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateVehicle(updateData, updateFilter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully updated vehicle"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = updateVehicle;
