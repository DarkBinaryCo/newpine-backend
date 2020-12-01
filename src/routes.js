const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth");
const ResidentRoutes = require("./routes/resident");

//* Official route setup
router.use("/auth", AuthRoutes);
router.use("/resident", ResidentRoutes);

module.exports = router;
