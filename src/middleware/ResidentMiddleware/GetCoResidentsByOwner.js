//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn and OwnershipMiddleware.LoggedInUserIsOwner
const { ResidentService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Get co-residents that share a residence with a given owner */
const getCoResidentsByOwner = async (req, res, next) => {
  let residentOwnerId = req.residentData.id;

  let filter = {
    residentOwnerId,
  };

  ApiUtil.attachErrorHandler(
    res,
    ResidentService.getResidents(filter).then((residentsFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully retrieved co-residents",
        residentsFound
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getCoResidentsByOwner;
