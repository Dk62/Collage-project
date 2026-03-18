const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password").populate("appliedCompanies");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  user.college = req.body.college ?? user.college;
  user.skills = req.body.skills ?? user.skills;
  user.resumeUrl = req.body.resumeUrl ?? user.resumeUrl;

  if (req.body.resumeData) {
    user.resumeData = { ...(user.resumeData.toObject?.() || user.resumeData), ...req.body.resumeData };
  }

  await user.save();
  const updated = await User.findById(req.user.id).select("-password").populate("appliedCompanies");
  res.json(updated);
};

const applyToCompany = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const companyId = req.params.companyId;
  const alreadyApplied = user.appliedCompanies.some((id) => String(id) === companyId);
  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied to this company" });
  }

  user.appliedCompanies.push(companyId);
  if (user.placementStatus === "preparing" || user.placementStatus === "not_started") {
    user.placementStatus = "applied";
  }
  user.notifications.unshift({ title: "Application Submitted", message: "You applied to a company successfully." });

  await user.save();
  const updated = await User.findById(req.user.id).select("-password").populate("appliedCompanies");
  res.json(updated);
};

const getNotifications = async (req, res) => {
  const user = await User.findById(req.user.id).select("notifications");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.notifications);
};

const markNotificationRead = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const notification = user.notifications.id(req.params.notificationId);
  if (!notification) return res.status(404).json({ message: "Notification not found" });

  notification.read = true;
  await user.save();
  res.json({ message: "Notification marked as read" });
};

const getAllUsers = async (_req, res) => {
  const users = await User.find({})
    .select("-password -resetPasswordToken -resetPasswordExpires")
    .populate("appliedCompanies", "name role packageLPA");
  res.json(users);
};

const updateUserPlacementStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.placementStatus = req.body.placementStatus || user.placementStatus;
  user.notifications.unshift({
    title: "Placement Status Updated",
    message: `Your placement status is now ${user.placementStatus}.`
  });

  await user.save();
  const sanitized = await User.findById(user._id)
    .select("-password -resetPasswordToken -resetPasswordExpires")
    .populate("appliedCompanies", "name role packageLPA");
  res.json(sanitized);
};

module.exports = {
  getProfile,
  updateProfile,
  applyToCompany,
  getNotifications,
  markNotificationRead,
  getAllUsers,
  updateUserPlacementStatus
};
