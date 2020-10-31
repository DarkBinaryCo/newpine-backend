/* 
    This file is simply meant to be an aggregator of all random util related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const getRandomHex = require('./getRandomHex');
const getRandomNumId = require('./getRandomNumId');
const getRandomNumInRange = require('./getRandomNumInRange');

//* EXPORTS
module.exports = {
    getRandomHex,
    getRandomNumId,
    getRandomNumInRange
};