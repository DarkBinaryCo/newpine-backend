//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

// Get the resident owner for a given property
const getPropertyResidentOwner = (req, res, next) => {
  const filter = { propertyId: req.params.propertyId, residentOwnerId: null };

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.getSingleResident(filter).then((residentFound) => {
      const isOk = Object.keys(residentFound).length > 0;
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
