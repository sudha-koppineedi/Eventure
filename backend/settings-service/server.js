const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Database connection
const connectDB = require('./src/config/db.config');
connectDB();

// ✅ IMPORTANT CHANGE HERE
// DO NOT use '/api/settings'
const settingsRoutes = require('./src/routes/settings.routes');
app.use('/', settingsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Settings service running on port ${PORT}`);
});