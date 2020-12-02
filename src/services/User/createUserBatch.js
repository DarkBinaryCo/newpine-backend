// Models
const { User } = require("../../models");

/** Create multiple users at once
 * @param {Array<Object>} usersData An array of user objects
 */
const createUserBatch = (usersData) => {
  let settableFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "userTypeId",
    "bio",
    "profileImgUrl",
    "profileImgThumbnailUrl",
  ];

  return User.bulkCreate(usersData, { fields: settableFields });
};

//* EXPORTS
module.exports = createUserBatch;
