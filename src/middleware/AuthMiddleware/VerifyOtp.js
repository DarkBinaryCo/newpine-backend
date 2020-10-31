// Services
const {
    AuthService
} = require('../../services');

// Utils
const {
    attachApiErrorHandler,
    getApiResponse,
    printApiResponse
} = require('../../utils/api');

/** Verify an OTP sent to the provided phone number */
const verifyOtp = (req, res, next) => {
    const {
        phone,
        otp
    } = req.body.data;

    //TODO: Add phone number validation ~ consider using a different middleware for that
    attachApiErrorHandler(res,
        AuthService.verifyOtp(phone, otp)
        .then(response => {
            const isOk = response !== false;
            //? For security purposes - Same message displayed for when OTP doesn't verify because it is invalid or user doesn't exist
            const message = isOk ? 'Successfully verified OTP' : 'Failed to verify OTP';
            const responseData = {
                isVerified: isOk
            };

            // If the response is not `false` it is the `token` generated from confirming the OTP.
            // This token should be stored on the client
            if (isOk) responseData.token = response;

            const apiResponse = getApiResponse(isOk, message, responseData);
            printApiResponse(res, apiResponse, next);
        })
    );
};

//* EXPORTS
module.exports = verifyOtp;