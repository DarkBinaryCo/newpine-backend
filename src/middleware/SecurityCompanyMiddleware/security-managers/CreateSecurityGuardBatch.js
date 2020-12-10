//* This middleware MUST be called after PermissionMiddleware.UserLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create security guards checkin */
const createdSecurityGuards = (req, res, next) => {
  let insertData = req.body.data || [];

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.createSecurityGuardBatch(insertData).then(
      (createdSecurityGuards) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          "Successfully created security guards",
          createdSecurityGuards,
          201
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = createdSecurityGuards;
