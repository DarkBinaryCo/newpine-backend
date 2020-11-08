// Utils
const { getSqlTimestamp } = require("../../../utils/date");

// Services
const UserService = require("../../User");

/** Save an OTP to the database ~ updates user information
 * @param {String} userId The id of the user the token belongs to
 * @param {String} OTP A 6 character (integer) OTP eg. 123456
 * @return {Object} Hashed OTP saved
 */
const _saveOtp = (userPhone, hashedOtp) => {
  const lastOtpSentAt = getSqlTimestamp();

  // Data to be inserted into the database
  const _updateFilter = {
    phone: userPhone,
  };

  const _updateData = {
    otp: hashedOtp,
    lastOtpSentAt,
  };

  // Update the user
  const insertResponse = UserService.updateUser(_updateData, _updateFilter);

  return insertResponse;
};

module.exports = _saveOtp;
