//* This middleware must be called after PermissionMiddleware.UserLoggedIn & UtilityMiddleware.RequestDataIsProvided
// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Update a user with the data provided */
const updateUser = (req, res, _) => {
  let filter = {
    id: req.params.userId,
  };

  if (req.body.filter) {
    filter = { ...filter, ...req.body.filter };
  }

  const updateData = req.body.data;

  // A user is no longer considered new when they are updated via this middleware
  updateData.isNew = false;

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.updateUser(updateData, filter).then((_) => {
      let apiResponse = ApiUtil.getResponse(true, "Successfully updated user");

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = updateUser;
