// Models
const { Community, Property } = require("../../../models");

/** Create a new property with `insertData`
 * @description This method also returns increments the number of properties that exist in the specified community
 * @param {Array<Object>} insertData Data to enter into the database
 * @param {UUID} communityId The id of the community these properties should belong to
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createPropertyBatch = async (insertData, communityId) => {
  let propertySettableFields = [
    "propertyNumber",
    "propertyTypeId",
    "propertyGroupId",
    "communityId",
  ];

  // This comes first to catch any potential errors during insertion & get number of records inserted
  const createdProperties = await Property.bulkCreate(insertData, {
    fields: propertySettableFields,
    returning: true,
  });

  await Community.increment(
    { propertyCount: createdProperties.length },
    { where: { id: communityId } }
  );

  return createdProperties;
};

//* EXPORTS
module.exports = createPropertyBatch;
