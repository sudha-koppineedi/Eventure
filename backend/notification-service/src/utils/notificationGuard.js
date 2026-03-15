const axios = require("axios");

const SETTINGS_SERVICE = "http://localhost:8005";

const canSendNotification = async (userId) => {
  try {
    // Check system feature
    const systemRes = await axios.get(`${SETTINGS_SERVICE}/system`);
    const systemSettings = systemRes.data.data;

    if (!systemSettings.features.notifications) {
      return false;
    }

    // Check user preference
    const userRes = await axios.get(`${SETTINGS_SERVICE}/user`, {
      headers: { "x-user-id": userId }
    });

    const userSettings = userRes.data.data;

    if (!userSettings.notifications.emailNotifications) {
      return false;
    }

    return true;

  } catch (error) {
    console.error("Notification guard error:", error.message);
    return false;
  }
};

module.exports = { canSendNotification };