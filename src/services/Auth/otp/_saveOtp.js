// Utils
const { DateUtil } = require("../../../utils");

// Services
const UserService = require("../../User");

/** Save an OTP to the database ~ updates user information
 * @param {String} userId The id of the user the token belongs to
 * @param {String} OTP A 6 character (integer) OTP eg. 123456
 * @return {Object} Hashed OTP saved
 */
const _saveOtp = async (userPhone, hashedOtp) => {
  const lastOtpSentAt = DateUtil.getSqlTimestamp();

  // Data to be inserted into the database
  const _updateFilter = {
    phone: userPhone,
  };

  const _updateData = {
    otp: hashedOtp,
    lastOtpSentAt,
  };

  // Update the user
  const insertResponse = await UserService.updateUser(
    _updateData,
    _updateFilter,
    true
  );

  return insertResponse;
};

module.exports = _saveOtp;
