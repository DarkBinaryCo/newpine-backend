//* This middleware should be called after PermissionMiddleware.SecurityManagerLoggedIn

const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Remove a security guard */
const removeGuard = (req, res, next) => {
  let filter = {
    id: req.params.securityGuardId,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.removeSecurityGuard(filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully removed security guard "
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = removeGuard;
