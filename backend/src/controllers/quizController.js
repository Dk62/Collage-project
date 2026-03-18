const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");

const createQuiz = async (req, res) => {
  const quiz = await Quiz.create(req.body);
  res.status(201).json(quiz);
};

const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().populate("questions").sort({ createdAt: -1 });
  res.json(quizzes);
};

const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
};

const updateQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  Object.assign(quiz, req.body);
  const updated = await quiz.save();
  res.json(updated);
};

const deleteQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  await quiz.deleteOne();
  res.json({ message: "Quiz deleted successfully" });
};

const submitQuiz = async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  let score = 0;
  quiz.questions.forEach((question) => {
    if (answers?.[question._id] === question.correctAnswer) score += 1;
  });

  const result = await Result.create({
    user: req.user.id,
    quiz: quiz._id,
    score,
    totalQuestions: quiz.questions.length
  });

  res.status(201).json({
    message: "Quiz submitted successfully",
    score,
    totalQuestions: quiz.questions.length,
    result
  });
};

module.exports = { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz, submitQuiz };
