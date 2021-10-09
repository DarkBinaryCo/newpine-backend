// Models
const getPropertyGroups = require("./getPropertyGroups");

/** Get all phases in our current system
 * @return {Array} An array containing a list of phases found matching the given filter
 * TODO: Consider adding a phases table.
 */
const getPhases = async () => {
  // Property groups contain phases if any
  const propertyGroups = await getPropertyGroups();

  // Using a set guarantees that we will not get duplicate values
  const phases = new Set();

  propertyGroups.forEach((propertyGroup) => {
    phases.add(propertyGroup.phase);
  });

  return Array.from(phases);
};

//* EXPORTS
module.exports = getPhases;
