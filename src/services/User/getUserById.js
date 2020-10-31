const getUserByFilter = require('./getUserByFilter');

/** Get the user by their user id
 * @param {String} userId The id of the user to get
 * @param {Array<String>} attributesToExclude An array of attributes to exclude from the selection
 * @param {Array<String>} extraAttributesToInclude An array of attributes to include along with the default included attributes
 */
const getUserById = (userId, attributesToExclude = [], extraAttributesToInclude = []) => {
    //? Getting by phone is such a common thing that we have created a function for it to speed up dev time
    const userData = getUserByFilter({
            id: userId
        },
        attributesToExclude,
        extraAttributesToInclude
    );

    return userData;
}

//* EXPORTS
module.exports = getUserById;