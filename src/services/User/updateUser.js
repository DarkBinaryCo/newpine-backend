// Models
const { User } = require("../../models");

/** Update a user matching the `filter` with `updateData`
 * @param {Object} updateData Database information to update
 * @param {Object} filter User filter
 * @param {Boolean} isAdmin Determines what data they can update. Defaults to `false`
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateUser = async (updateData = {}, filter = {}, isAdmin = false) => {
  let settableFields = [
    "firstName",
    "lastName",
    "dob",
    "gender",
    "phone",
    "email",
    "bio",
    "identificationTypeId",
    "identificationNumber",
    "profileImgUrl",
    "profileImgThumbnailUrl",
    "isNew",
  ];

  // Only admins can ban/verify users
  if (isAdmin) {
    settableFields.push("otp", "lastOtpSentAt", "isBanned", "isVerified");
  }

  // Actually update the user
  return User.update(updateData, {
    where: filter,
    fields: settableFields,
  });
};

//* EXPORTS
module.exports = updateUser;
