const uuid = require("uuid");

// Models
const { User } = require("../../models");

/** Create multiple users at once
 * @param {Array<Object>} usersData An array of user objects
 */
const createUserBatch = (usersData) => {
  // Generate a unique ID for each user
  usersData = usersData.map((user) => {
    user.id = uuid.v4();
    return user;
  });

  let settableFields = [
    "id",
    "firstName",
    "lastName",
    "phone",
    "email",
    "userTypeId",
    "bio",
    "profileImgUrl",
    "profileImgThumbnailUrl",
  ];

  return User.bulkCreate(usersData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createUserBatch;
