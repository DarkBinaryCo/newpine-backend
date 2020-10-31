/* 
    This file is simply meant to be an aggregator of all AuthService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const authTokenFunctions = require('./authToken');
const otpFunctions = require('./otp');

//* EXPORTS
module.exports = {
    ...authTokenFunctions,
    ...otpFunctions
};