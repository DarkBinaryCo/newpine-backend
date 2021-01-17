//* This middleware must be called after PermissionMiddleware.UserLoggedIn
// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Get the currently logged in user and return their data */
const getLoggedInUser = (req, res, next) => {
  //! Making a second get request to the user table to fetch additional information ~ possible area for optimization
  let filter = { id: req.userData.id };

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.getSingleUser(filter).then((userFound) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully retrieved user details",
        userFound
      );

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getLoggedInUser;
