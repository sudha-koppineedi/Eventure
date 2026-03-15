const express = require("express");
const router = express.Router();

const {
  getUserSettings,
  updateUserSettings,
  getSystemSettings,
  updateSystemSettings
} = require("../controllers/settings.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

router.use(protect);

// User Settings
router.get("/user", getUserSettings);
router.put("/user", updateUserSettings);

// System Settings (Admin Only)
router.get("/system", authorize("admin"), getSystemSettings);
router.put("/system", authorize("admin"), updateSystemSettings);

module.exports = router;