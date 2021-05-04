//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get all vehicles belonging to a given property */
const getPropertyVehicles = (req, res, next) => {
  let filter = {
    "Resident.propertyId": req.params.propertyId,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.getVehicles(filter).then((vehiclesFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        `Found ${vehiclesFound.length} vehicles`,
        vehiclesFound
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getPropertyVehicles;
