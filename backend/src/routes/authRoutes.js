const express = require("express");
const { registerUser, loginStudent, loginAdmin, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/student/register", registerUser);
router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
