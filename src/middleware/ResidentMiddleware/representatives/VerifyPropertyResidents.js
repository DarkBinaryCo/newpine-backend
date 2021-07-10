//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Verify a resident account (and user account belonging to the resident) with a given user ID - used by resident representatives */
const verifyResidentAccount = async (req, res, next) => {
  const { propertyId } = req.params;

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updatePropertyResidentVerification(propertyId, true).then(
      (response) => {
        let apiResponse;

        //! This relies on data being returned when there is no residents being exactly `false`. Potential area for bugs
        if (response === false) {
          apiResponse = ApiUtil.getError(
            "[Error] That property doesn't see to have any residents as of now",
            null,
            404
          );
          return ApiUtil.printResponse(res, apiResponse, next);
        } else {
          //
          apiResponse = ApiUtil.getResponse(
            true,
            `Successfully verified the existing property residents`
          );
        }

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = verifyResidentAccount;
