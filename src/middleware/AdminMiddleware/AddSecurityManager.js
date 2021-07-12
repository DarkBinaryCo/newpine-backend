// Config
const { USER_TYPE } = require("../../config/auth");

// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/**  Add a security manager account. This is simply a user account with a userType of Security manager */
const addSecurityManager = (req, res, next) => {
  let userData = req.body.data || {};

  userData.userTypeId = USER_TYPE.SECURITY_MANAGER;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.createUser(userData).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully created security manager account",
        null,
        201
      );

      ApiUtil.printResponse(res, apiResponse);
      ``;
    })
  );
};

//* EXPORTS
module.exports = addSecurityManager;
