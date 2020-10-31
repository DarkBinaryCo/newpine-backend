const hash = require('./hash');

/** Verify a plain value's hash
 * @param {String} plainValue Raw string value to compare with hash
 * @param {String} hashToCompare The hash to compare with the hashed version of `plainValue`
 * @return {Boolean} `true` if the plain value generates the same hash as `hashToCompare` & false if otherwise
 */
const verifyHash = (plainValue, hashToCompare) => {
    const hashedComparison = hash(plainValue);

    const isSameHash = hashedComparison === hashToCompare;

    return isSameHash;
}

//* EXPORTS
module.exports = verifyHash;