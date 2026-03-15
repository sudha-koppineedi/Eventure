const mongoose = require("mongoose");

const UserSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User"
    },

    notifications: {
      emailNotifications: { type: Boolean, default: true },
      eventReminders: { type: Boolean, default: true },
      announcementAlerts: { type: Boolean, default: true }
    },

    appearance: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" }
    },

    privacy: {
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
      },
      showParticipationHistory: {
        type: Boolean,
        default: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSettings", UserSettingsSchema);