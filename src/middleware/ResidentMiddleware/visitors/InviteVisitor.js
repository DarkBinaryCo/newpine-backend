//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { CommService, VisitorService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Invite a visitor */
const inviteVisitor = (req, res, next) => {
  let inviteData = req.body.data || {};

  // Set the resident inviter to the currently logged in resident
  inviteData.residentInviterId = req.residentData.id;

  ApiUtil.attachErrorHandler(
    res,
    VisitorService.inviteVisitor(inviteData).then((_) => {
      // If there is an email text
      if (inviteData.email) {
        console.log(`Sending invitation email to ${inviteData.email}`);
        //TODO: Send email to the invited user email
      }

      let apiResponse = ApiUtil.getResponse(
        true,
        "Invitation sent to the user",
        null,
        201
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = inviteVisitor;
