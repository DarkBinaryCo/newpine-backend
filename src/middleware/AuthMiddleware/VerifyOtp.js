// Services
const { AuthService } = require("../../services");

// Utils
const { ApiUtil, FormatUtil } = require("../../utils");

/** Verify an OTP sent to the provided phone number */
const verifyOtp = (req, res, next) => {
  const { phone, otp } = req.body.data;

  // Convert the phone number to international so that our Database is not angry
  //TODO: Add country code logic
  const phoneInternational = FormatUtil.getPhoneInternationalFormat(phone);

  //TODO: Add phone number validation ~ consider using a different middleware for that
  ApiUtil.attachErrorHandler(
    res,
    AuthService.verifyOtp(phoneInternational, otp).then((response) => {
      const isOk = response !== false;
      //? For security purposes - Same message displayed for when OTP doesn't verify because it is invalid or user doesn't exist
      const message = isOk
        ? "Successfully verified OTP"
        : "Failed to verify OTP";

      let responseData = {
        isVerified: isOk,
      };

      // If the response is not `false` it is the `token` generated from confirming the OTP.
      // This token should be stored on the client
      if (isOk) responseData = { ...responseData, ...response };

      const apiResponse = ApiUtil.getResponse(isOk, message, responseData);
      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = verifyOtp;
