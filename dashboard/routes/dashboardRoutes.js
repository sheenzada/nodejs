const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/dashboard", isAuthenticated, getDashboard);

module.exports = router;