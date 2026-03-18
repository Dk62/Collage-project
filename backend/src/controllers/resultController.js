const Result = require("../models/Result");

const createResult = async (req, res) => {
  const result = await Result.create({ ...req.body, user: req.user.id });
  res.status(201).json(result);
};

const getMyResults = async (req, res) => {
  const results = await Result.find({ user: req.user.id }).populate("quiz").sort({ createdAt: -1 });
  res.json(results);
};

const getDashboardStats = async (req, res) => {
  const results = await Result.find({ user: req.user.id });
  const totalAttempts = results.length;
  const averagePercentage = totalAttempts
    ? Math.round(
        results.reduce((sum, item) => sum + (item.totalQuestions ? (item.score / item.totalQuestions) * 100 : 0), 0) / totalAttempts
      )
    : 0;

  res.json({ totalAttempts, averagePercentage });
};

module.exports = { createResult, getMyResults, getDashboardStats };
