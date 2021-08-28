//* This middleware should be called after PermissionMiddleware.SecurityGuardLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get visitor checkins */
const getVisitorCheckins = (req, res, next) => {
  let filter = { ...JSON.parse(req.query.filter), ...req.body.filter };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.getVisitorCheckins(filter).then((checkinsFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        `${checkinsFound.length} visitor checkins found`,
        checkinsFound
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getVisitorCheckins;
