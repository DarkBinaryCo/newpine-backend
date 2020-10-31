const getUserByFilter = require('./getUserByFilter');

/** Get the user by their phone number
 * @param {String} userPhone The phone number of the user to get
 * @param {Array<String>} attributesToExclude An array of attributes to exclude from the selection
 * @param {Array<String>} extraAttributesToInclude An array of attributes to include along with the default included attributes
 * @return {Object} The user found or null if no user was found
 */
const getUserById = (userPhone, attributesToExclude = [], extraAttributesToInclude = []) => {
    //? Getting by phone is such a common thing that we have created a function for it to speed up dev time
    const userData = getUserByFilter({
            phone: userPhone
        },
        attributesToExclude,
        extraAttributesToInclude);

    return userData;
}

//* EXPORTS
module.exports = getUserById;