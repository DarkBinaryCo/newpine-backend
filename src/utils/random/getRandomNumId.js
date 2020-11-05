// Config
const { USER_ID_VALUE } = require("../../config/constants");

// Internal - Random util related
const getRandomNumInRange = require("./getRandomNumInRange");

/** Get a random integer id. Uses timestamp and random prefix & suffix to generate an integer id
 * @param {Number} min The minimum id number
 * @param {Number} max The maximum id number
 */
const getRandomNumId = (min = 10000, max = 999999999) => {
  const generatedId = getRandomNumInRange(min, max);
  return generatedId;
};

//* EXPORTS
module.exports = getRandomNumId;
