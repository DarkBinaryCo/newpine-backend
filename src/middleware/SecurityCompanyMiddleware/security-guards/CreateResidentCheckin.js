//* This middleware MUST be called after PermissionMiddleware.SecurityGuardLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create resident checkin */
const createResidentCheckin = (req, res, next) => {
  let insertData = req.body.data || {};

  insertData.securityGuardId = req.securityGuardData.id;

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
