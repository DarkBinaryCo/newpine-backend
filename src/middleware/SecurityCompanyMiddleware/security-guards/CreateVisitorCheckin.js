//* This middleware should be called after SecurityCompanyMiddleware.SecurityManagerLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create resident checkin */
const createVisitorCheckin = (req, res, next) => {
  let insertData = req.body.data || {};

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.createVisitorCheckin(insertData).then(
      (createdCheckin) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          "Successfully created visitor checkin",
          createdCheckin,
          201
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = createVisitorCheckin;
