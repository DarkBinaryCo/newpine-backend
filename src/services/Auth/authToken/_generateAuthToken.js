const {
    hash
} = require('../../../utils/auth');

const {
    getRandomHex
} = require('../../../utils/random');

/** Generate an Auth token for a user
 * @return {Object} An object containing the raw and hashed version of the generated token
 */
const _generateAuthToken = (tokenLength = 32) => {
    const tokenToHash = getRandomHex(tokenLength);
    const hashedToken = hash(tokenToHash);

    const responseData = {
        token: tokenToHash,
        hashedToken //? Store this in db but DON'T return to client
    }

    return responseData;
}

//* EXPORTS
module.exports = _generateAuthToken;