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
 * @param {String} userPhone The phone number to send the OTP to
 * @param {Number} userType What type of user will be created ? Defaults to DB default
 * @return {Object} An object representing the status of the OTP send operation
 */
const sendOtp = async (userPhone, userType = null) => {
  let user = await UserService.getSingleUser({ phone: userPhone }, [
    "otp",
    "lastOtpSentAt",
  ]);

  /**
   //! Note: Ideally, user creation should not happen in the `sendOtp` function but rather be treated as its own functionality with its own endpoint
   The downside to this is that users need to make multiple requests to create the user which means it is slightly slower.
   The upside is it is more flexible and more secure since we do not expose unwanted user creation functionality to users (such as creating admins)
  */
  // If the user does not exist ~ create them
  if (!user) {
    const newUserData = {
      phone: userPhone,
    };

    // If a user type was specified ~ add it to the new user's data
    if (userType) {
      newUserData.userTypeId = userType;
    }

    const newUser = await UserService.createUser(newUserData);
    user = newUser.dataValues;
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
