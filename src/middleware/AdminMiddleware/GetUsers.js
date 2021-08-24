const _ = require("lodash");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Services
const { UserService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/**  Add a security manager account. This is simply a user account with a userType of Security manager */
const getUsers = (req, res, _) => {
  const filter = {
    id: {
      [Op.not]: req.userData.id, // Exclude the currently logged in user
    },
    ...req.body.filter,
  };

  //
  ApiUtil.attachErrorHandler(
    res,
    UserService.getUsers(filter).then((users) => {
      const message = _.isEmpty(users)
        ? "No users found"
        : "Successfully retrieved users";

      const apiResponse = ApiUtil.getResponse(true, message, users);

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getUsers;
