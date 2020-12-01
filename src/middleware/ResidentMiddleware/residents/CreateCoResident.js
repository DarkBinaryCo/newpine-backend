//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { UserService, ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create a co-resident.
 * Ensure residentOwnerId is passed in as part of this data
 * @example Expects `data.user` containing user data and `data.resident` containing resident data
 * @example data.user = {}
 * @example data.resident = {}
 */
const createCoResident = async (req, res, next) => {
  // Get the user data from the request data
  let { user } = req.body.data || {};

  // Create user the co-resident would belong to
  let coResidentUserCreated = await UserService.createUser(user);

  //? Set the co-resident defaults
  let residentData = {
    isActive: true,
    userId: coResidentUserCreated.id,
    residentOwnerId: req.residentData.id,
    propertyId: req.residentData.propertyId,
  };

  // Create the actual resident & send API response
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.createResident(residentData, false).then(
      (residentCreated) => {
        //TODO: Send SMS/Email to created resident

        let apiResponse = ApiUtil.getResponse(
          true,
          "Successfully created co-resident",
          residentCreated,
          201
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = createCoResident;
