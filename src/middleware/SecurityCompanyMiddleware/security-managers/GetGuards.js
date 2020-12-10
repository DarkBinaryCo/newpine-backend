//* This middleware should be called after PermissionMiddleware.SecurityManagerLoggedIn

const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get security guards */
const getGuards = (req, res, next) => {
  let filter = req.body.filter || {};

  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.getSecurityGuards(filter).then(
      (securityGuardsFound) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          `${securityGuardsFound.length} security guards found`,
          securityGuardsFound
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = getGuards;
