// Config
const {
    USER_ID_VALUE
} = require('../../config/constants');

// Internal - Random util related
const getRandomNumInRange = require('./getRandomNumInRange');

/** Get a random integer id. Uses timestamp and random prefix & suffix to generate an integer id */
const getRandomNumId = () => {
    const generatedId = getRandomNumInRange(USER_ID_VALUE.MIN, USER_ID_VALUE.MAX);
    return generatedId;
}

//* EXPORTS
module.exports = getRandomNumId;