//* This middleware must be called after PermissionMiddleware.UserLoggedIn & UtilityMiddleware.RequestDataIsProvided
// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Update the logged in user with the data provided */
const updateLoggedInUser = (req, res, next) => {
  let filter = { id: req.userData.id };
  let updateData = req.body.data;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.updateUser(updateData, filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(true, "Successfully updated user");

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = updateLoggedInUser;
