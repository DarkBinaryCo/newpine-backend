//* This middleware should be called after PermissionMiddleware.SecurityManagerLoggedIn

const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get security shifts */
const getSecurityShifts = (req, res, next) => {
  let filter = { ...JSON.parse(req.query.filter), ...req.body.filter };

  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.getSecurityShifts(filter).then(
      (securityShiftsFound) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          `${securityShiftsFound.length} security shifts found`,
          securityShiftsFound
        );

        ApiUtil.printResponse(res, apiResponse);
      }
    )
  );
};

//* EXPORTS
module.exports = getSecurityShifts;
