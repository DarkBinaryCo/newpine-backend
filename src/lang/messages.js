//? If we want to add localization, we can create a directory called `messages` and have an `index.js` file that determines what language file to use. Uses `en-gb/` as a default directory for fetching the messages

/** Message sent when sending an OTP confirmation request
 * @param {String|Number} otp A multi-digit One time password
 * @return {String} The message
 */
const sendConfirmOtpMessage = (otp) =>
  `${otp} is your Newpine OTP. Use this to verify your account. Do not share this with anyone.`;

//* EXPORTS
module.exports = {
  sendConfirmOtpMessage,
};
