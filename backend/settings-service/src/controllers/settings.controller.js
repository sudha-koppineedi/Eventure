const SystemSettings = require("../models/SystemSettings");
const UserSettings = require("../models/UserSettings");

/*
====================================================
GET USER SETTINGS
====================================================
*/
exports.getUserSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user.id });

    // Auto-create default settings if not exists
    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user.id
      });
    }

    return res.status(200).json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error("GET USER SETTINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user settings"
    });
  }
};

/*
====================================================
UPDATE USER SETTINGS
====================================================
*/
exports.updateUserSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user.id
      });
    }

    settings.notifications = req.body.notifications;
    settings.appearance = req.body.appearance;
    settings.privacy = req.body.privacy;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "User settings updated successfully",
      data: settings
    });

  } catch (error) {
    console.error("UPDATE USER SETTINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user settings"
    });
  }
};

/*
====================================================
GET SYSTEM SETTINGS (ADMIN ONLY)
====================================================
*/
exports.getSystemSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();

    // Auto-create default system config if not exists
    if (!settings) {
      settings = await SystemSettings.create({});
    }

    return res.status(200).json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error("GET SYSTEM SETTINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch system settings"
    });
  }
};

/*
====================================================
UPDATE SYSTEM SETTINGS (ADMIN ONLY)
====================================================
*/
exports.updateSystemSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();

    if (!settings) {
      settings = await SystemSettings.create({});
    }

    settings.access = req.body.access;
    settings.events = req.body.events;

    settings.uploads = {
      ...req.body.uploads,
      allowedFileTypes: req.body.uploads.allowedFileTypes
        .split(",")
        .map((type) => type.trim())
    };

    settings.features = req.body.features;
    settings.updatedBy = req.user?.id;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "System settings updated successfully",
      data: settings
    });

  } catch (error) {
    console.error("UPDATE SYSTEM SETTINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update system settings"
    });
  }
};