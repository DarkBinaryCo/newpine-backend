const {
    FMT_SQL_TIMESTAMP
} = require('../../config/constants');
const moment = require('moment');

/** Check if the timestamp provided has already passed 
 * @param {String} sqlTimestamp A timestamp in the sql timestamp format
 * @param {String|optional} timestampFormat The format of the sqlTimestamp that has been passed. Defaults to SQL timestamp format
 * @return {Boolean} `true` if the time has elapsed | `false` otherwise
 */
const timeHasElapsed = (sqlTimestamp, timestampFormat = FMT_SQL_TIMESTAMP) => {
    const timestampMoment = moment(sqlTimestamp, timestampFormat);
    return moment().isAfter(timestampMoment)
};


//* EXPORTS
module.exports = timeHasElapsed;