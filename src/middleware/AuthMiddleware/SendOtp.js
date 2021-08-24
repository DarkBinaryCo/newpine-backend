// Config
const { USER_TYPE } = require("../../config/auth");

// Services
const { AuthService } = require("../../services");

// Utils
const { ApiUtil, FormatUtil } = require("../../utils");

/** Send an OTP the provided phone number */
const sendOtp = (req, res, next) => {
  const { phone } = req.body.data;

  // Only allow certain user types a user can create (only resident and resident rep)
  const userTypesAllowed = [USER_TYPE.RESIDENT, USER_TYPE.RESIDENT_REP];
  const typeOfUserToCreate = req.body.data.userType;

  // Don't allow creation of any other type of user that isn't explicitly allowed here
  if (!userTypesAllowed.includes(typeOfUserToCreate)) {
    const error = new Error("Signup is not available for that account type");

    const apiResponse = ApiUtil.getError(error.message, error, 400);
    return ApiUtil.printResponse(res, apiResponse);
  }

  // Convert the phone number to international so that our SMS provider API is not angry
  //TODO: Add country code logic
  const phoneInternational = FormatUtil.getPhoneInternationalFormat(phone);

  ApiUtil.attachErrorHandler(
    res,
    AuthService.sendOtp(phoneInternational, typeOfUserToCreate).then(
      (response) => {
        const isOk = response.hasSent && !response.isWaiting;
        let message = isOk
          ? `Successfully sent OTP to ${phoneInternational}`
          : "Failed to send OTP";
        message = response.isWaiting
          ? "Failed: You need to wait before you can send another OTP request"
          : message;
        const statusCode = isOk ? 200 : 403;

        const apiResponseData = {
          phone,
          ...response,
        };

        const apiResponse = ApiUtil.getResponse(
          isOk,
          message,
          apiResponseData,
          statusCode
        );

        ApiUtil.printResponse(res, apiResponse);
      }
    )
  );
};

//* EXPORTS
module.exports = sendOtp;
