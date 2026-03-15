

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const connectDB = require('./src/config/db.config');

const app = express();

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(helmet());

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

/*
IMPORTANT:
We mount routes at "/"
NOT "/api/auth"
Gateway handles "/api/auth"
Service handles only "/login", "/register", etc.
*/
app.use('/', authRoutes);
app.use('/admin', adminRoutes);

// Proper error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});