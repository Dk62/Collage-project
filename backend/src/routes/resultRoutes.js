const express = require("express");
const { createResult, getMyResults, getDashboardStats } = require("../controllers/resultController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/", protect, authorizeRoles("student"), createResult);
router.get("/my", protect, authorizeRoles("student"), getMyResults);
router.get("/stats/me", protect, authorizeRoles("student"), getDashboardStats);

module.exports = router;
