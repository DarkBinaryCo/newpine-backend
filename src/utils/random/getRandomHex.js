const crypto = require('crypto');

/** Get a random integer id. Uses timestamp and random prefix & suffix to generate an integer id */
const getRandomHex = (tokenLength = 32) => {
    const generatedHex = crypto.randomBytes(tokenLength).toString('hex');
    return generatedHex;
}

//* EXPORTS
module.exports = getRandomHex;