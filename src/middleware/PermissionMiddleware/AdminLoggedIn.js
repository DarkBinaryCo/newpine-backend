//? Duplicate this  file and change the appropriate user
const UserLoggedIn = require("./UserLoggedIn");

// Config
const { USER_TYPE } = require("../../config/auth");

const AUTH_DATA = {
  userTypeId: USER_TYPE.ADMIN,
  userTypeTitle: "admin",
};

/** Only proceeds to the next middleware if a sales user is logged in based on the `AuthToken` passed in.
 *
 * Also sets `userData` on the `request` as `req.userData` that can be used by any middleware that comes after
 */
const AdminLoggedIn = async (req, res, next) => {
  req.authData = AUTH_DATA;

  return UserLoggedIn(req, res, next);
};

//* EXPORTS
module.exports = AdminLoggedIn;
