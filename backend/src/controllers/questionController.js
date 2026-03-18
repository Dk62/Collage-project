const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.status(201).json(question);
};

const getQuestions = async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.difficulty) filter.difficulty = req.query.difficulty;

  const questions = await Question.find(filter).sort({ createdAt: -1 });
  res.json(questions);
};

const getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });
  res.json(question);
};

const updateQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });

  Object.assign(question, req.body);
  const updated = await question.save();
  res.json(updated);
};

const deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });

  await question.deleteOne();
  res.json({ message: "Question deleted successfully" });
};

module.exports = { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion };
