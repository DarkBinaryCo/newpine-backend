//* This middleware must be called after PermissionMiddleware.UserLoggedIn
// Services
const { VisitorService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

const visitorCanCheckin = (req, res, next) => {
  let requestData = req.body.data;
  let invitationId = requestData ? requestData.visitorInvitationId : null;
  let filter = { id: invitationId };

  ApiUtil.attachErrorHandler(
    res,
    VisitorService.getSingleVisitorInvitation(filter).then(
      (visitorInvitationFound) => {
        // Visitor invitation was not found or the visitor invitation is inactive and this is a checkin request
        if (
          !visitorInvitationFound ||
          (!visitorInvitationFound.isActive && requestData.isCheckin)
        ) {
          let apiResponse = ApiUtil.getUnauthorizedError(
            "Check-in denied! Please ensure that the visitor you are trying to invite has an active invitation before attempting to check them in."
          );

          ApiUtil.printResponse(res, apiResponse, next);
        } else {
          next();
        }
      }
    )
  );
};

//* EXPORTS
module.exports = visitorCanCheckin;
