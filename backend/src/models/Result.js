const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);
