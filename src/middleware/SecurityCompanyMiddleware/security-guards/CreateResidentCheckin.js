//* This middleware should be called after SecurityCompanyMiddleware.SecurityManagerLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create resident checkin */
const createResidentCheckin = (req, res, next) => {
  let insertData = req.body.data || {};

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.createResidentCheckin(insertData).then(
      (createdCheckin) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          "Successfully created resident checkin",
          createdCheckin,
          201
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = createResidentCheckin;
