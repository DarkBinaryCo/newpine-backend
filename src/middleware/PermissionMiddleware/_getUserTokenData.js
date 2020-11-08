const { AuthService } = require("../../services");

/** [Helper] Get token information and the user that owns the token
 * @param {Object} req The request from a middleware. Should contain a bearer token.
 */
const _getUserTokenData = async (req) => {
  // Set response data defaults ~ returned before we find user
  let responseData = {
    loggedIn: false,
    tokenData: null,
  };

  // No need to go further if we don't have any authorization headers provided
  if (!req.headers.authorization) return responseData;

  // Get the token
  const token = req.headers.authorization.split(" ")[1];
  const tokenOwner = await AuthService.getAuthToken(token);

  if (!tokenOwner || !tokenOwner.user) return responseData;

  //* Getting here means that we found a token owner ~ user successfully logged in
  responseData.loggedIn = true;
  responseData.tokenData = tokenOwner;

  return responseData;
};

//* EXPORTS
module.exports = _getUserTokenData;
