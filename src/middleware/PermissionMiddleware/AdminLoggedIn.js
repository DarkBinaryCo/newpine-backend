//? Duplicate this  file and change `AUTH_DATA` to the appropriate user type
const UserLoggedIn = require("./UserLoggedIn");

// Config
const { USER_TYPE } = require("../../config/auth");

/** Only proceeds to the next middleware if a sales user is logged in based on the `AuthToken` passed in.
 *
 * Also sets `userData` on the `request` as `req.userData` that can be used by any middleware that comes after
 */
const AdminLoggedIn = async (req, res, next) => {
  const AUTH_DATA = {
    userTypeId: USER_TYPE.ADMIN,
    userTypeTitle: "admin",
  };

  req.authData = AUTH_DATA;
  UserLoggedIn(req, res, next);
};

//* EXPORTS
module.exports = AdminLoggedIn;
