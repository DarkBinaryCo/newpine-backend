//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get all vehicles belonging to a given property */
const getPropertyVehicles = async (req, res, next) => {
  const { propertyId } = req.params;

  //
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.getResidents({ propertyId }).then(async (residents) => {
      let vehicles = [];
      let currentResident;

      for (let i = 0; i < residents.length; i++) {
        currentResident = residents[i];

        // Find all vehicles belonging to either of the residents belonging to the property
        const vehiclesFound = await ResidentService.getVehicles(
          { residentId: currentResident.id },
          false
        );
        vehicles = [...vehicles, ...vehiclesFound];
      }

      let apiResponse;
      // Vehicles were found
      if (vehicles.length) {
        apiResponse = ApiUtil.getResponse(
          true,
          `Successfully retrieved property vehicles (${vehicles.length})`,
          vehicles
        );
      } else {
        // Vehicles were not found
        apiResponse = ApiUtil.getError(
          "No vehicles found for that property",
          null,
          404
        );
      }

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getPropertyVehicles;
