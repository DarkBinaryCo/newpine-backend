// Config
const { USER_TYPE } = require("../../../config/auth");

// Localization
const { sendConfirmOtpMessage } = require("../../../lang/messages");

// Other services
const UserService = require("../../User");
const CommService = require("../../Comm");

// Auth service related
const _generateOtp = require("./_generateOtp");
const _saveOtp = require("./_saveOtp");
const _otpHasExpired = require("./_otpHasExpired");

/** Send OTP to a user with the phone specified
 * @param {Object} user The user sending the message. Must contain the `phone` & `lastOtpSentAt`
 * @return {Object} An object representing the status of the OTP send operation
 */
const sendOtp = async (user) => {
  // Send more specific information on what happened
  let responseData = {
    hasSent: false, // Did the otp get sent
    isWaiting: true, // Do we need to wait before sending another OTP
  };

  // Check if the user still has a valid OTP ~ prevents OTP request spamming
  //NOTE: Figure out a return value that will be more obvious to other developers using this function
  if (!_otpHasExpired(user.lastOtpSentAt)) return responseData;

  //* Getting here means the user has waited long enough and can request otp
  const { otp, hashedOtp } = _generateOtp();

  // Send the OTP to the phone entered
  const messageToSend = sendConfirmOtpMessage(otp);
  const sendStatus = await CommService.sendSms([user.phone], messageToSend);

  // Set the response data
  responseData.hasSent = sendStatus.hasSent;

  // Save the hashed version of the OTP to the database only if the OTP was actually sent
  // if (sendStatus.hasSent) {
  _saveOtp(user.phone, hashedOtp);
  // }

  //TODO: Remove this in production
  console.log("Sent otp: ", otp);

  responseData.isWaiting = false;
  responseData.messageData = sendStatus;

  return responseData;
};

//* EXPORTS
module.exports = sendOtp;
