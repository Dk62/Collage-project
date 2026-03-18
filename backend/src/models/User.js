const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  college: { type: String, default: "" },
  skills: [{ type: String }],
  resumeUrl: { type: String, default: "" },
  placementStatus: { type: String, enum: ["not_started", "preparing", "applied", "interviewing", "placed"], default: "preparing" },
  appliedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date },
  notifications: [notificationSchema],
  resumeData: {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    careerObjective: { type: String, default: "" },
    skills: { type: String, default: "" },
    education: { type: String, default: "" },
    projects: { type: String, default: "" },
    certifications: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
