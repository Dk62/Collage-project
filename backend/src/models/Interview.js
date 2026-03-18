const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  companyName: { type: String, default: "" },
  scheduledAt: { type: Date, required: true },
  mode: { type: String, enum: ["online", "offline"], default: "online" },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
