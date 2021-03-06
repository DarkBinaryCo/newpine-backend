const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth");
const PropertyRoutes = require("./routes/property");
const UserRoutes = require("./routes/user");
const AdminRoutes = require("./routes/admin");
const ResidentRoutes = require("./routes/resident");
const ResidentRepRoutes = require("./routes/resident-rep");
const SecurityCompanyRoutes = require("./routes/security-company");

//* Official route setup
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/admin", AdminRoutes);
router.use("/property", PropertyRoutes);
router.use("/resident", ResidentRoutes);
router.use("/resident-rep", ResidentRepRoutes);
router.use("/security", SecurityCompanyRoutes);

module.exports = router;
