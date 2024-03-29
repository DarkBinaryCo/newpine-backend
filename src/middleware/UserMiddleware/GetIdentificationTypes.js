//* This middleware should be called after PermissionMiddleware.UserLoggedIn

const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Get identification types */
const getIdentificationTypes = (req, res, next) => {
  let filter = { ...JSON.parse(req.query.filter || "{}"), ...req.body.filter };

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.getIdentificationTypes(filter).then(
      (identificationTypesFound) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          `${identificationTypesFound.length} identification types found`,
          identificationTypesFound
        );

        ApiUtil.printResponse(res, apiResponse);
      }
    )
  );
};

//* EXPORTS
module.exports = getIdentificationTypes;
