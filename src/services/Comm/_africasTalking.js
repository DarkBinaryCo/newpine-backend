// Initialize Africa's Talking & export it
// Set your app credentials
const {
    AT_CREDENTIALS
} = require('../../config/africastalking');

// Initialize the SDK
const AfricasTalking = require('africastalking')(AT_CREDENTIALS);

//* EXPORTS
module.exports = AfricasTalking;