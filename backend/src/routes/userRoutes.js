const express = require("express");
const {
  getProfile,
  updateProfile,
  applyToCompany,
  getNotifications,
  markNotificationRead,
  getAllUsers,
  updateUserPlacementStatus
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/profile", protect, authorizeRoles("student"), getProfile);
router.put("/profile", protect, authorizeRoles("student"), updateProfile);
router.post("/apply/:companyId", protect, authorizeRoles("student"), applyToCompany);
router.get("/notifications", protect, authorizeRoles("student"), getNotifications);
router.put("/notifications/:notificationId/read", protect, authorizeRoles("student"), markNotificationRead);

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.put("/:id/placement-status", protect, authorizeRoles("admin"), updateUserPlacementStatus);

module.exports = router;
