//* This middleware MUST be called after PermissionMiddleware.UserLoggedIn
// Services
const { SecurityCompanyService, UserService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create security guards checkin */
const createSecurityGuard = (req, res, next) => {
  const { user: userData, securityGuard: securityGuardData } = req.body.data;

  // Set blame for security guard created
  securityGuardData.addedByUserId = req.userData.id;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.createUser(userData).then((createdUser) => {
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
