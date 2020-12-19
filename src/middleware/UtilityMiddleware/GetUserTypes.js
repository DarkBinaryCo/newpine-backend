//* This middleware should be called after PermissionMiddleware.UserLoggedIn

const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get user types */
const getUserTypes = (req, res, next) => {
  let filter = req.body.filter || {};

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.getUserTypes(filter).then((userTypesFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        `${userTypesFound.length} user types found`
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getUserTypes;
