//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { VisitorService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Revoke a visitor invitation */
const revokeVisitorInvitation = (req, res, next) => {
  let invitationId = req.params.invitationId;
  console.log(`Invitation ID: ${invitationId}`);

  let deleteFilter = {
    id: invitationId,
    residentInviterId: req.residentData.id,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    VisitorService.revokeVisitorInvitation(deleteFilter).then((_) => {
      //? Showing success whether the invitation exists or not (prevents attackers from knowing whether an invitation exists or not)
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully revoked invitation"
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = revokeVisitorInvitation;
