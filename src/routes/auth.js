const express = require("express");
const router = express.Router();

const {
    AuthMiddleware
} = require("../middleware");

// Send OTP
router.post('/otp', AuthMiddleware.SendOtp);

// Verify OTP
router.post('/otp/verify', AuthMiddleware.VerifyOtp);

//* EXPORTS
module.exports = router;