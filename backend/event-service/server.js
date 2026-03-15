const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const eventRoutes = require("./src/routes/event.routes");
const errorHandler = require("./src/middleware/error.middleware");
const connectDB = require("./src/config/db.config");

const app = express();

/*
====================================================
DATABASE
====================================================
*/
connectDB();

/*
====================================================
SECURITY & MIDDLEWARE
====================================================
*/

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(helmet());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

/*
====================================================
ROUTES
IMPORTANT: Mount at /events
====================================================
*/
app.use("/", eventRoutes);

/*
====================================================
HEALTH CHECK
====================================================
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event service is running",
    timestamp: new Date().toISOString(),
  });
});

/*
====================================================
ERROR HANDLER
====================================================
*/
app.use(errorHandler);

/*
====================================================
START SERVER
====================================================
*/
const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
});