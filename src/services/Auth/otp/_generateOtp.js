const { OTP_LENGTH } = require("../../../config/auth");

// Utils
const { AuthUtil, RandomUtil } = require("../../../utils");

/** Generate a numeric one time password (OTP)
 * @return {Number} A random OTP (6 characters by default)
 */
const _generateOtp = (otpLength = OTP_LENGTH) => {
  /** 10^otpLength returns the smallest number with a length of `otpLength + 1`.
   * We subtract 1 from the operation result to get the largest number with a length of `OTP_LENGTH`
   * @example If `otpLength = 4 = (10^4) = 10000
   */
  const minNum = Math.pow(10, otpLength);

  /** 10^(otpLength - 1) returns the smallest number with a length of `otpLength`
   * @example If `otpLength = 4`
   * `maxNum = 10^(4-1) = 10^3 = 1000`
   * `'1000'.length` = 4 (otpLength)
   */
  const maxNum = Math.pow(10, otpLength - 1);

  const otp = RandomUtil.getRandomNumInRange(minNum, maxNum).toString();
  const hashedOtp = AuthUtil.hash(otp);

  const responseData = {
    otp,
    hashedOtp, //? Store this in db but DON'T return to client
  };

  return responseData;
};

//* EXPORTS
module.exports = _generateOtp;
