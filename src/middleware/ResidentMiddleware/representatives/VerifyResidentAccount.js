//* This middleware must be called after PermissionMiddleware.ResidentRepresentativeLoggedIn
// Services
const { ResidentService, UserService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Verify a resident account (and user account belonging to the resident) with a given user ID - used by resident representatives */
const verifyResidentAccount = async (req, res, next) => {
  let userIdToUpdate = req.params.userId;

  let residentUpdateFilter = { userId: userIdToUpdate || null };
  let residentUpdateData = { isVerified: true };

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.updateResident(
      residentUpdateData,
      residentUpdateFilter,
      true
    ).then(async (_) => {
      let userUpdateFilter = { id: userIdToUpdate };
      let userUpdateData = { isVerified: true };

      // Verify the user account attached to the resident as well
      await UserService.updateUser(userUpdateData, userUpdateFilter, true);

      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully verified resident"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = verifyResidentAccount;
