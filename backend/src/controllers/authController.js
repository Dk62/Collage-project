const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { isEmailValid, isStrongPassword } = require("../utils/validators");

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id, user.role)
});

const loginByRole = async (req, res, expectedRole) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (user.role !== expectedRole) {
    const roleLabel = expectedRole === "admin" ? "admin" : "student";
    return res.status(403).json({ message: `This account is not authorized for the ${roleLabel} portal` });
  }

  res.json(buildAuthResponse(user));
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "student",
    notifications: [{ title: "Welcome", message: "Welcome to the Placement Portal." }]
  });

  res.status(201).json(buildAuthResponse(user));
};

const loginStudent = async (req, res) => loginByRole(req, res, "student");

const loginAdmin = async (req, res) => loginByRole(req, res, "admin");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "If the email exists, a reset token has been generated." });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15);
  user.notifications.unshift({
    title: "Password Reset Requested",
    message: "A password reset token was generated for your account."
  });
  await user.save();

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  res.json({
    message: "Reset token generated successfully",
    resetToken: token,
    resetLink
  });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = "";
  user.resetPasswordExpires = null;
  user.notifications.unshift({ title: "Password Reset", message: "Your password was reset successfully." });
  await user.save();

  res.json({ message: "Password reset successful" });
};

module.exports = { registerUser, loginStudent, loginAdmin, forgotPassword, resetPassword };
