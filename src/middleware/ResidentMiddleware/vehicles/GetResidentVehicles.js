//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get all vehicles belonging to a resident */
const getResidentVehicles = (req, res, next) => {
  let filter = {
    residentId: req.residentData.id,
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

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getResidentVehicles;
