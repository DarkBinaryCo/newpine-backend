/* For this file  to work, the user must be logged in (MUST be used after calling the UserLoggedIn middleware) */
//? Duplicate this  file and change `AUTH_DATA` to the appropriate user type
// Config
const { USER_TYPE } = require("../../config/auth");

/** Only proceeds to the next middleware if a sales user is logged in based on the `AuthToken` passed in.
 *
 * Also sets `userData` on the `request` as `req.userData` that can be used by any middleware that comes after
 */
const AdminLoggedIn = async (req, res, next) => {
  let userData = req.userData;

  // No point checking if we have the right user type logged in if we have no logged in user data to check
  if (!userData) {
    throw new Error(
      "\nIt would appear the middleware was called before calling UserLoggedIn. Please call the UserLoggedIn middleware before calling this.\n"
    );
  }

  console.log("\nUser data: ", userData);
  // USER_TYPE.ADMIN;

  console.log(req);
};

//* EXPORTS
module.exports = AdminLoggedIn;
