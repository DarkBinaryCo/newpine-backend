// Services
const { AuthService } = require("../../services");

// Utils
const { ApiUtil, FormatUtil } = require("../../utils");

/** Send an OTP the provided phone number */
const sendOtp = (req, res, next) => {
  const { phone } = req.body.data;

  // Convert the phone number to international so that our SMS provider API is not angry
  const phoneInternational = FormatUtil.getPhoneInternationalFormat(phone);

  ApiUtil.attachErrorHandler(
    res,
    AuthService.sendOtp(phoneInternational).then((response) => {
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

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = sendOtp;
