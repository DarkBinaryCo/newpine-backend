//* This middleware must be called after PermissionMiddleware.ResidentLoggedIn
const { VisitorService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Get visitor invitations for the currently logged in resident */
const getVisitorInvitations = (req, res, next) => {
  let filter = req.body.filter || {};

  // Get the residents that were invited by the currently logged in user
  filter.residentInviterId = req.residentData.id;

  ApiUtil.attachErrorHandler(
    res,
    VisitorService.getVisitorInvitations(filter).then((visitorsFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        `Found ${visitorsFound.length} visitor(s)`,
        visitorsFound
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getVisitorInvitations;
