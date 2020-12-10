//* This middleware MUST be called after PermissionMiddleware.SecurityGuardLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Paranoid delete resident checkin */
const removeResidentCheckin = (req, res, next) => {
  let filter = {
    id: req.params.checkinId,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.removeResidentCheckin(filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully removed resident checkin"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = removeResidentCheckin;
