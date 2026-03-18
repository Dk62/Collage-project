const Interview = require("../models/Interview");

const getMyInterviews = async (req, res) => {
  const interviews = await Interview.find({ user: req.user.id }).sort({ scheduledAt: 1 });
  res.json(interviews);
};

const createInterview = async (req, res) => {
  const interview = await Interview.create(req.body);
  res.status(201).json(interview);
};

const updateInterviewStatus = async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview) return res.status(404).json({ message: "Interview not found" });

  interview.status = req.body.status || interview.status;
  if (req.body.feedback !== undefined) interview.feedback = req.body.feedback;
  await interview.save();

  res.json(interview);
};

module.exports = { getMyInterviews, createInterview, updateInterviewStatus };
