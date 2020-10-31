const crypto = require('crypto');

// Custom
const {
    TOKEN_SALT
} = require('../../config/auth');

/** Generate a hashed version of a plain value using a SALT we provide. 
 * Uses [SHA512](https://en.wikipedia.org/wiki/SHA-2) to hash.
 * @param {String} plainValue The value to hash
 * @param {Number} hashCycles Number of cycles the hash algorithm should run
 * @param {Number} hashLength 
 * @param {String} salt Salt used to hash the `plainValue`
 * @return {String} A hashed version of the `plainValue`
 */
const hash = (plainValue, hashCycles = 1000, hashLength = 64, salt = TOKEN_SALT) => {
    const hashedValue = crypto.pbkdf2Sync(plainValue, salt, hashCycles, hashLength, 'sha512').toString('hex');

    return hashedValue;
};


//* EXPORTS
module.exports = hash;