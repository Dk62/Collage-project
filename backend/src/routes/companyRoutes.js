const express = require("express");
const { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } = require("../controllers/companyController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/", protect, authorizeRoles("admin"), createCompany);
router.put("/:id", protect, authorizeRoles("admin"), updateCompany);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCompany);

module.exports = router;
