//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

// Get the resident owner for a given property
const getPropertyResidentOwner = (req, res, next) => {
  const filter = { propertyId: req.params.propertyId, residentOwnerId: null };

  const _includeUserDetails = true;
  const _includePropertyDetails = false;

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.getSingleResident(
      filter,
      false,
      _includeUserDetails,
      _includePropertyDetails
    ).then((residentFound) => {
      const isOk = !!residentFound;
      const message = isOk
        ? "Successfully retrieved property resident owner"
        : "No resident owner for that property was found";
      const statusCode = isOk ? 200 : 404;

      const apiResponse = ApiUtil.getResponse(
        isOk,
        message,
        residentFound,
        statusCode
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

module.exports = getPropertyResidentOwner;
