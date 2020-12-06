const { sendConfirmOtpMessage } = require("../../../lang/messages");

// Other services
const UserService = require("../../User");
const CommService = require("../../Comm");

// Auth service related
const _generateOtp = require("./_generateOtp");
const _saveOtp = require("./_saveOtp");
const _otpHasExpired = require("./_otpHasExpired");

/** Send OTP to a user with the phone specified
 * @param {String} userPhone The phone number to send the OTP to
 * @return {Object} An object representing the status of the OTP send operation
 */
const sendOtp = async (userPhone) => {
  let user = await UserService.getSingleUser({ phone: userPhone }, [
    "otp",
    "lastOtpSentAt",
  ]);

  // If the user does not exist ~ create them
  if (!user) {
    const newUser = await UserService.createUser({
      phone: userPhone,
    });

    user = newUser.dataValues || {}; //? Consider removing the || - Possibly  a scenario we don't need to handle
  }

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
  const sendStatus = await CommService.sendSms([userPhone], messageToSend);

  // Set the response data
  responseData.hasSent = sendStatus.hasSent;

  // Save the hashed version of the OTP to the database only if the OTP was actually sent
  // if (sendStatus.hasSent) {
  _saveOtp(userPhone, hashedOtp);
  // }
  //TODO: Remove this in production
  console.log("Sent otp: ", otp);

  responseData.isWaiting = false;
  responseData.messageData = sendStatus;

  return responseData;
};

//* EXPORTS
module.exports = sendOtp;
