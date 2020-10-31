/* 
    This file is simply meant to be an aggregator of all date related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const addTimeToTimestamp = require('./addTimeToTimestamp');
const getSqlTimestamp = require('./getSqlTimestamp');
const timeHasElapsed = require('./timeHasElapsed');

//* EXPORTS
module.exports = {
    addTimeToTimestamp,
    getSqlTimestamp,
    timeHasElapsed
};