//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Remove a vehicle */
const removeVehicle = (req, res, next) => {
  let filter = {
    id: req.params.vehicleId,
    residentId: req.residentData.id,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.removeVehicle(filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully removed vehicle"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = removeVehicle;
