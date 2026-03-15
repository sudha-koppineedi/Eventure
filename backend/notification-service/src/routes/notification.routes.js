const express = require("express");
const router = express.Router();

const {
  sendRegistrationNotification,
  getUserNotifications,
  markAsRead
} = require("../controllers/notification.controller");

const { protect } = require("../middleware/auth.middleware");

// Public internal call
router.post("/registration", sendRegistrationNotification);

// User routes
router.get("/", protect, getUserNotifications);
router.put("/:id/read", protect, markAsRead);

module.exports = router;