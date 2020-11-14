const { AuthToken, User } = require("../../../models");

// Utils
const { AuthUtil } = require("../../../utils");

/** Get the details of a token from the database
 * @param {String} tokenEntered The unhashed token whose information we want to fetch
 * @return {Object} The token's data
 */
const getAuthToken = async (tokenEntered) => {
  const token = AuthUtil.hash(tokenEntered);

  const tokenResponse = await AuthToken.findOne({
    where: {
      token,
    },
    attributes: ["token", "userId", "expiresOn"],
    include: [
      {
        model: User,
        required: true,
        attributes: ["firstName", "lastName", "userTypeId"],
      },
    ],
  });
  let tokenData = tokenResponse.dataValues || {};

  if (tokenData) {
    //? Add the user as a direct object so we don't have to use `user.dataValues` each time we want a user's information
    tokenData.user = tokenData.User ? tokenData.User.dataValues : null;
  }

  return tokenData;
};

//* EXPORTS
module.exports = getAuthToken;
