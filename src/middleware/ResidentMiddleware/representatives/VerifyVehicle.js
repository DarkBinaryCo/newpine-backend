//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Verify a specific vehicle (given a vehicle ID) */
const verifyVehicle = async (req, res, next) => {
  let filter = { id: req.params.vehicleId };
  let updateData = { isVerified: true };

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateVehicle(updateData, filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully verified vehicle"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = verifyVehicle;
