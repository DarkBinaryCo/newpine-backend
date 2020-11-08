// Models
const { User } = require("../../models");

// Utils
const { filterObjAttrs } = require("../../utils/filter");

/** Update a user matching the `filter` with `updateData`
 * @param {Object} updateData Database information to update
 * @param {Object} filter User filter
 * @param {Boolean} isAdmin Determines what data they can update. Defaults to `false`
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateUser = async (updateData = {}, filter = {}, isAdmin = false) => {
  // Attributes that shouldn't be editable ~ unsetting them if set
  updateData = filterObjAttrs(updateData, ["id", "createdAt"]);

  if (!isAdmin) {
    updateData = filterObjAttrs(updateData, ["isBanned", "isVerified"]);
  }
  const updateStatus = await User.update(updateData, {
    where: filter,
  });

  return updateStatus;
};

//* EXPORTS
module.exports = updateUser;
