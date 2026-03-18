const Company = require("../models/Company");

const createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json(company);
};

const getCompanies = async (req, res) => {
  const companies = await Company.find().sort({ createdAt: -1 });
  res.json(companies);
};

const getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
};

const updateCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });

  Object.assign(company, req.body);
  const updated = await company.save();
  res.json(updated);
};

const deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });

  await company.deleteOne();
  res.json({ message: "Company deleted successfully" });
};

module.exports = { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany };
