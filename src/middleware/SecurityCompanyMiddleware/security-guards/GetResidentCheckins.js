//* This middleware should be called after PermissionMiddleware.UserLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create resident checkin */
const getResidentCheckins = (req, res, next) => {
  let filter = { ...JSON.parse(req.query.filter), ...req.body.filter };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.getResidentCheckins(filter).then((checkinsFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        `${checkinsFound.length} resident checkins found`,
        checkinsFound
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getResidentCheckins;
