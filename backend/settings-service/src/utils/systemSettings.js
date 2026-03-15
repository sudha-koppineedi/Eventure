const axios = require("axios");

let cachedSettings = null;
let lastFetched = 0;

const CACHE_DURATION = 30000; // 30 seconds

const DEFAULT_SETTINGS = {
  access: {
    registrationEnabled: true,
    maintenanceMode: false
  },
  events: {
    maxUsersPerEvent: 100,
    maxEventsPerOrganizer: 10,
    defaultEventCapacity: 100
  },
  features: {
    leaderboard: true
  }
};

const getSystemSettings = async () => {
  const now = Date.now();

  if (cachedSettings && now - lastFetched < CACHE_DURATION) {
    return cachedSettings;
  }

  try {
    const res = await axios.get("http://localhost:8005/system");
    cachedSettings = res.data.data;
    lastFetched = now;
    return cachedSettings;

  } catch (error) {
    console.error("Settings service unavailable. Using defaults.");
    return DEFAULT_SETTINGS;
  }
};

module.exports = getSystemSettings;