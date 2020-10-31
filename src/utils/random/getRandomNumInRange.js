/** Gets a random positive integer within the range of `min`(include) to `max`(exclude) 
 * `max` is excluded, meaning the actual highest value random number is `max-1`
 * @param {Number} min The minimum random number
 * @param {Number} max The maximum random number. It is excluded and the actual max is `max-1`
 * @return {Number} A random number in the range of `min` to `max-1`
 */
const getRandomNumInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//* EXPORTS
module.exports = getRandomNumInRange;