/* 
    This file is simply meant to be an aggregator of all AuthMiddleware related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const SendOtp = require('./SendOtp');
const VerifyOtp = require('./VerifyOtp');

//* EXPORTS
module.exports = {
    SendOtp,
    VerifyOtp
};