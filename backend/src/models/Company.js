const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  packageLPA: { type: Number, default: 0 },
  driveDate: { type: Date },
  eligibility: { type: String, default: "" },
  description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
