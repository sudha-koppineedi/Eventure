const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// 🔥 Explicit absolute path
const envPath = path.join(__dirname, '.env');

// Debug: check if file exists
console.log("ENV file exists:", fs.existsSync(envPath));
console.log("ENV path being used:", envPath);

// Load .env manually
dotenv.config({ path: envPath });

const connectDB = require('./src/config/db.config');
const leaderboardRoutes = require('./src/routes/leaderboard.routes');
const errorHandler = require('./src/middleware/error.middleware');

const app = express();
const server = http.createServer(app);

connectDB();

app.use(helmet());

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use('/', leaderboardRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'leaderboard-service'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8004;

server.listen(PORT, () => {
  console.log(`Leaderboard service running on port ${PORT}`);
  console.log("JWT_SECRET after dotenv load:", process.env.JWT_SECRET);
});

module.exports = app;