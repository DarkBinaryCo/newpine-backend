const {
    FMT_SQL_TIMESTAMP
} = require('../../config/constants');

const moment = require('moment');

/** Get the sql timestamp of a given day
 * @param {Object} timeToAdd An object that allows us to add time to the timestamp we are generating
 * @return {String} A timestamp string with all the operations performed on it
 */
//? Tested and working ~ it is difficult to create a unit test for this as the value is always changing
const getSqlTimestamp = (timeToAdd = {}) => {
    const nowMoment = moment()
    nowMoment.add(timeToAdd);

    return nowMoment.format(FMT_SQL_TIMESTAMP);
};

//* EXPORTS
module.exports = getSqlTimestamp;