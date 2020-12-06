//* This middleware should be called after SecurityCompanyMiddleware.SecurityManagerLoggedIn

const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Update a security guard */
const updateGuard = (req, res, next) => {
  let updateData = req.body.data || {};
  let filter = {
    id: req.params.securityGuardId,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.updateSecurityGuard(updateData, filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully updated security guard"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = updateGuard;
