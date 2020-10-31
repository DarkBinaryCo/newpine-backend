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


/** Send an OTP the provided phone number */
const sendOtp = (req, res, next) => {
    const {
        phone
    } = req.body.data;

    attachApiErrorHandler(res,
        AuthService.sendOtp(phone)
        .then(response => {
            const isOk = response.hasSent && !response.isWaiting;
            let message = isOk ? `Successfully sent OTP to ${phone}` : 'Failed to send OTP';
            message = response.isWaiting ? 'Failed: You need to wait before you can send another OTP request' : message;
            const statusCode = isOk ? 200 : 403;

            const apiResponseData = {
                phone,
                ...response
            };

            const apiResponse = getApiResponse(isOk, message, apiResponseData, statusCode);

            printApiResponse(res, apiResponse, next);
        })
    );
};

//* EXPORTS
module.exports = sendOtp;