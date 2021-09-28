//* This middleware MUST be called after PermissionMiddleware.UserLoggedIn
// Config
const { USER_TYPE } = require("../../../config/auth");

// Services
const { SecurityCompanyService, UserService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create security guards checkin */
const createSecurityGuard = (req, res, next) => {
  const { user: userData, securityGuard: securityGuardData } = req.body.data;

  userData.communityId = req.userData.communityId;

  //
  userData.userTypeId = USER_TYPE.SECURITY_GUARD;

  // Auto-verify new guards as they are added
  userData.isVerified = true;

  // Set blame for security guard created
  securityGuardData.addedByUserId = req.userData.id;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.createUser(userData, true).then((createdUser) => {
      // Get the id of the created user and set it as the security guard's user id
      securityGuardData.userId = createdUser.id;

      SecurityCompanyService.createSecurityGuard(securityGuardData).then(
        (createSecurityGuard) => {
          let apiResponse = ApiUtil.getResponse(
            true,
            "Successfully added the security guard",
            createSecurityGuard,
            201
          );

          ApiUtil.printResponse(res, apiResponse);
        }
      );
    })
  );
};

//* EXPORTS
module.exports = createSecurityGuard;
