const express = require("express");
const { getMyInterviews, createInterview, updateInterviewStatus } = require("../controllers/interviewController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/my", protect, authorizeRoles("student"), getMyInterviews);
router.post("/", protect, authorizeRoles("admin"), createInterview);
router.put("/:id/status", protect, authorizeRoles("admin"), updateInterviewStatus);

module.exports = router;
