// Services
const UserService = require("../../User");

// Utils
const { AuthUtil } = require("../../../utils");

// Auth related
const { createAuthToken } = require("../authToken");

/** Verify OTP for a given phone number
 * @param {String} userPhone The phone number the OTP belongs to
 * @return {Promsie<Boolean>} A promise that resolves to `true` if the OTP was valid and `false` if the otp was NOT valid
 */
const verifyOtp = async (userPhone, otpEntered) => {
  const user = await UserService.getSingleUser({ phone: userPhone }, [
    "id",
    "otp",
  ]);

  // Return false if the user does not exist ~ no need for further checks
  if (!user) return false;

  const currentUserOtpHash = user.otp;

  // Check if the OTP entered matches the OTP in the database
  const isValidOtp = AuthUtil.verifyHash(otpEntered, currentUserOtpHash);

  // If the OTP is invalid ~ return false
  if (!isValidOtp) return false;

  //* Getting here means the OTP is valid ~ return a generated token/api key
  const authToken = createAuthToken(user.id);

  // Reset the value of the OTP in the database
  const _updateFilter = { phone: userPhone };
  const _updateData = { otp: null };

  UserService.updateUser(_updateData, _updateFilter, true);

  return { token: authToken, user };
};

//* EXPORTS
module.exports = verifyOtp;
