//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Verify a specific vehicle (given a vehicle ID) */
const verifyVehicle = async (req, res, next) => {
  const isVerify = req.body.data.verify || false;

  const filter = { id: req.params.vehicleId };
  const updateData = { isVerified: isVerify };

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateVehicle(updateData, filter).then((_) => {
      const verb = isVerify ? "verified" : "unverified";

      const apiResponse = ApiUtil.getResponse(
        true,
        `Successfully ${verb} vehicle`
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = verifyVehicle;
