const {
    FMT_SQL_TIMESTAMP
} = require('../../config/constants');

const moment = require('moment');

/** Get the sql timestamp of a given day
 * @param {String} timestamp An SQL timestamp
 * @param {Object} timeToAdd An object that allows us to add time to the timestamp we are generating
 * @return {String} A timestamp string with the time specified added to it
 */
//? Tested and working ~ it is difficult to create a unit test for this as the value is always changing
const addTimeToTimestamp = (timestamp, timeToAdd) => {
    const nowMoment = moment(timestamp)
    nowMoment.add(timeToAdd);

    return nowMoment.format(FMT_SQL_TIMESTAMP);
};

//* EXPORTS
module.exports = addTimeToTimestamp;