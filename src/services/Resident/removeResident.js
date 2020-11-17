const { Resident } = require("../../models");
const { Op } = require("sequelize");

/** Remove a resident by ID. Can be used to remove co-residents. Admin can use this to remove a resident account of any kind altogether
 * @param {String} filter The filter that will determine who is removed
 * @param {Boolean} isAdmin If true, allows removal of any kind of resident (including resident owners)
 */
const removeResident = (filter = {}, isAdmin = false) => {
  //TODO: Non-admins should only be able to remove co-residents

  return Resident.destroy({ where: filter });
};

//* EXPORTS
module.exports = removeResident;
