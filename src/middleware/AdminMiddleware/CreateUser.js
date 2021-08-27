// Config
const { USER_TYPE } = require("../../config/auth");

// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/**  Add a user */
const createUser = (req, res, _) => {
  let userData = req.body.data || {};
  const { userTypeId } = req.params;

  const acceptableUserTypes = [
    USER_TYPE.ADMIN,
    USER_TYPE.SALES,
    USER_TYPE.RESIDENT_REP,
    USER_TYPE.SECURITY_MANAGER,
  ];

  // No point proceeding if we are trying to create a user type we should not be able to create as an admin
  if (!acceptableUserTypes.includes(parseInt(userTypeId))) {
    const error = new Error("Unable to create a user of that type");
    const apiResponse = ApiUtil.getError(error.message, error, 400);

    ApiUtil.printResponse(res, apiResponse);
  }

  //* Getting here means we are allowed to create the user type
  userData.userTypeId = parseInt(userTypeId);
  userData.isActive = true;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.createUser(userData, true).then((_) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully created user",
        null,
        201
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = createUser;
