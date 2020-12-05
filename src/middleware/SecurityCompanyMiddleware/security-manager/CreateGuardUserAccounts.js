//* This middleware should be called after SecurityCompanyMiddleware.SecurityManagerLoggedIn
// Config
const { USER_TYPE } = require("../../../config/auth");

// Services
const { UserService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create multiple security guard accounts */
const createGuardUserAccounts = (req, res, next) => {
  let securityGuardUsers = req.body.data || [];

  if (!securityGuardUsers.length) {
    throw new Error(
      "Please ensure you pass an array of user objects to create the guard user accounts"
    );
  }

  // Set the user identification type for each of the users
  securityGuardUsers = securityGuardUsers.map((user) => {
    user.userTypeId = USER_TYPE.SECURITY_GUARD;
    return user;
  });

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.createUserBatch(securityGuardUsers).then(
      (createdSecurityGuards) => {
        let apiResponse = ApiUtil.getResponse(
          true,
          `Successfully added ${securityGuardUsers.length} security guard user accounts`,
          createdSecurityGuards
        );

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = createGuardUserAccounts;
