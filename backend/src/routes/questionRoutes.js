const express = require("express");
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", protect, authorizeRoles("admin"), createQuestion);
router.put("/:id", protect, authorizeRoles("admin"), updateQuestion);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuestion);

module.exports = router;
