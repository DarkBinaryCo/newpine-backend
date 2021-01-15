// Services
const { AuthService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Verify an OTP sent to the provided phone number */
const verifyOtp = (req, res, next) => {
  const { phone, otp } = req.body.data;

  //TODO: Add phone number validation ~ consider using a different middleware for that
  ApiUtil.attachErrorHandler(
    res,
    AuthService.verifyOtp(phone, otp).then((response) => {
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
      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = verifyOtp;
