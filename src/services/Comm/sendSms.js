const _sendSmsAT = require('./_sendSmsAT');

/** Send an SMS 
 * @param {Array<String>} recipientPhones An array of recipients for this sms
 * @param {String} messageToSend The message to send (keep in mind 1 sms = 160char max)
 * @return {Object} An object representing the status of the SMS sending
 */
const sendMessage = (recipientPhones = [], messageToSend = '') => {
    let sendResponse;

    //TODO: Add split SMS sending (use AT for local & other API for international to save on costs)
    sendResponse = _sendSmsAT(recipientPhones, messageToSend);

    return sendResponse;
}

//* EXPORTS
module.exports = sendMessage;