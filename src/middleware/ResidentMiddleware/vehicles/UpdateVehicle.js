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

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateResident(updateData, updateFilter, false).then(
      (vehicleUpdated) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          "Successfully updated vehicle",
          vehicleUpdated
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = updateVehicle;
