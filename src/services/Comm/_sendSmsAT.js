const AfricasTalking = require("./_africasTalking");
const { FormatUtil } = require("../../utils");

// Get the SMS service
const sms = AfricasTalking.SMS;

// Send a message
const _sendSmsAT = async (phoneNumbers = [], messageToSend = "") => {
  const options = {
    // Set the numbers you want to send to in international format
    to: phoneNumbers,
    // Set your message
    message: messageToSend,
    // Set your shortCode or senderId
    from: process.env.AT_SENDER_ID,
  };

  const { SMSMessageData } = await sms.send(options);

  const hasSent =
    SMSMessageData.Recipients.length && SMSMessageData.message !== "RiskHold";
  const responseData = {
    hasSent: !!hasSent,
    message: SMSMessageData.Message,
  };

  // Store this in logs
  console.debug("Send message to %a status %o  ", phoneNumbers, responseData);

  return responseData;
};

module.exports = _sendSmsAT;
