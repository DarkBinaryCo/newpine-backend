//* This middleware must be called after PermissionMiddleware.UserLoggedIn & UtilityMiddleware.RequestDataIsProvided
// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Update a user with the data provided */
const updateUser = (req, res, _next) => {
  filter = { id: req.params.userId, ...req.body.filter };

  const updateData = req.body.data;

  // A user is no longer considered new when they are updated via this middleware
  updateData.isNew = false;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.updateUser(updateData, filter, true).then((_) => {
      let apiResponse = ApiUtil.getResponse(true, "Successfully updated user");

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = updateUser;
