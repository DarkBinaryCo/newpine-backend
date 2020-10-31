/** Return attributes with the listed attributes filtered out 
 * @param {Object} objToFilter Object to filter out attributes from
 * @param {Array<String>} attrsToFilter Attributes to remove from the `objToFilter`
 * @return An object with all the `attrsToFilter` removed from `objToFilter`
 */
const filterObjAttrs = (objToFilter, attrsToFilter = []) => {
    // Loop through each attribute to remove and remove it from the object to filter
    attrsToFilter.forEach(attr => {
        delete objToFilter[attr];
    });

    return objToFilter;
};

//* EXPORTS
module.exports = filterObjAttrs;