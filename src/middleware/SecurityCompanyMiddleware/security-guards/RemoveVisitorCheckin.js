//* This middleware MUST be called after PermissionMiddleware.SecurityGuardLoggedIn
// Services
const { SecurityCompanyService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Paranoid delete visitor checkin */
const removeVisitorCheckin = (req, res, next) => {
  let filter = {
    id: req.params.checkinId,
    securityGuardId: req.securityGuardData.id, //! A security guard can only remove a checkin they added
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    SecurityCompanyService.removeVisitorCheckin(filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully removed visitor checkin"
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = removeVisitorCheckin;
