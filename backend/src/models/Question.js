const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  category: { type: String, default: "aptitude" },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
