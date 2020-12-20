const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const AdminRoutes = require("./routes/admin");
const ResidentRoutes = require("./routes/resident");
const SecurityCompanyRoutes = require("./routes/security-company");

//* Official route setup
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/admin", AdminRoutes);
router.use("/resident", ResidentRoutes);
router.use("/security", SecurityCompanyRoutes);

module.exports = router;
