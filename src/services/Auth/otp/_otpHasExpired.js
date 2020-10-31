// Config
const {
    OTP_EXPIRY_SECONDS
} = require('../../../config/auth');

// Utils
const {
    addTimeToTimestamp,
    timeHasElapsed
} = require('../../../utils/date');

/** We can send an OTP - Has the user waited long enough to request another OTP?
 * @param {String} lastOtpSentAt A string representing an SQL timestamp of the last time an OTP was requested by the user
 * @return {Boolean} `true` if we are allowed to send another otp | `false` if we need to wait
 */
const _otpHasExpired = (lastOtpSentAt) => {
    // If the last otp send timestamp cannot be found this means it is a new account otp request, allow otp request
    if (!lastOtpSentAt) return true;

    const otpExpiryTime = addTimeToTimestamp(lastOtpSentAt, {
        seconds: OTP_EXPIRY_SECONDS
    });

    return timeHasElapsed(otpExpiryTime);
};

//* EXPORTS
module.exports = _otpHasExpired;