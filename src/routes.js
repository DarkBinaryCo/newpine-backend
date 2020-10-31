const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth");

//* Official route setup
router.use("/auth", AuthRoutes);

module.exports = router;
