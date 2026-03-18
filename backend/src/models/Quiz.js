const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: Number, default: 30 }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
