const axios = require("axios");

let cachedSettings = null;
let lastFetched = 0;

const CACHE_DURATION = 30000; // 30 seconds

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
    console.error("Failed to fetch system settings");
    return null;
  }
};

module.exports = getSystemSettings;