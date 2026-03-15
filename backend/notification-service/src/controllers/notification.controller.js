const Notification = require("../models/Notification");
const { canSendNotification } = require("../utils/notificationGuard");

/*
====================================================
SEND REGISTRATION NOTIFICATION
====================================================
*/
exports.sendRegistrationNotification = async (req, res, next) => {
  try {
    const { userId, eventTitle } = req.body;

    if (!userId || !eventTitle) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const allowed = await canSendNotification(userId);

    if (!allowed) {
      return res.status(200).json({
        success: false,
        message: "Notification blocked by settings"
      });
    }

    const message = `You have successfully registered for ${eventTitle}`;

    // 1️⃣ Save to DB
    const notification = await Notification.create({
      userId,
      type: "registration",
      message
    });

    // 2️⃣ Emit socket event to specific user room
    if (req.io) {
      req.io.to(`user-${userId}`).emit("newNotification", notification);
    }

    return res.status(200).json({
      success: true,
      message: "Notification created",
      data: notification
    });

  } catch (error) {
    next(error);
  }
};

/*
====================================================
GET USER NOTIFICATIONS
====================================================
*/
exports.getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });

  } catch (error) {
    next(error);
  }
};

/*
====================================================
MARK AS READ
====================================================
*/
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    notification.read = true;
    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (error) {
    next(error);
  }
};