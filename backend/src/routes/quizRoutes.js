const express = require("express");
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz, submitQuiz } = require("../controllers/quizController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/", protect, authorizeRoles("admin"), createQuiz);
router.put("/:id", protect, authorizeRoles("admin"), updateQuiz);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuiz);
router.post("/:id/submit", protect, authorizeRoles("student"), submitQuiz);

module.exports = router;
