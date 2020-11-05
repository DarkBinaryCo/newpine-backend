const _generateAuthToken = require("./_generateAuthToken");
const _saveAuthToken = require("./_saveAuthToken");

/** Create and save an auth token to database
 * @param {userId} The id of the user the token belongs to
 * @return {String} A non-hashed version of the token generated. This is the value a client will use as their API key/Token when sending a request
 */
const createAuthToken = (userId) => {
  const { token } = _generateAuthToken();

  // Save auth token result logging
  _saveAuthToken(userId, token).then(console.debug);

  // return the token generated
  return token;
};

//* EXPORTS
module.exports = createAuthToken;
