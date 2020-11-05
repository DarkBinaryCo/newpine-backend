const { getRandomHex } = require("../../../utils/random");

/** Generate an Auth token for a user
 * @return {Object} An object containing the raw and hashed version of the generated token
 */
const _generateAuthToken = (tokenLength = 32) => {
  const tokenToHash = getRandomHex(tokenLength);

  const responseData = {
    token: tokenToHash,
  };

  return responseData;
};

//* EXPORTS
module.exports = _generateAuthToken;
