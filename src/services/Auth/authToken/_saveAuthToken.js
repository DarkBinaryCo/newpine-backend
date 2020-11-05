const { AuthToken } = require("../../../models");

const { getSqlTimestamp } = require("../../../utils/date");

const { TOKEN_EXPIRY_SECONDS } = require("../../../config/auth");

/** Save an auth token to the database
 * @param {String} userId The id of the user the token belongs to
 * @param {String} token A generated token
 * @return {Object} Token created/found
 */
const _saveAuthToken = async (userId, token) => {
  // Get token expiry ~ no need to refactor since this is only used here
  const expiresOn = getSqlTimestamp({
    seconds: TOKEN_EXPIRY_SECONDS,
  });

  // Get token for user with id of `userId`
  const currentUserToken = await AuthToken.findOne({
    where: {
      userId,
    },
  });

  /** The response we receive from our Create/Update operation */
  let insertResponse;

  // Data to be inserted into the database
  let tokenData = {
    token,
    expiresOn,
  };

  // If a token for the current user exists ~ update it with a new token
  if (currentUserToken) {
    //? NOTE: No `userId` included in token data because we are not updating it ~ possible over-optimization
    insertResponse = AuthToken.update(tokenData, {
      where: {
        userId,
      },
    });
  } else {
    //* User does not exist ~ create a new token entry
    //? NOTE: Adding `userId` here since it is a new user
    tokenData.userId = userId;

    insertResponse = AuthToken.create(tokenData);
  }

  return insertResponse;
};

//* EXPORTS
module.exports = _saveAuthToken;
