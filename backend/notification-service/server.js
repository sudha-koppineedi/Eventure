// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = require('./src/config/db.config');
// const announcementRoutes = require('./src/routes/announcement.routes');
// const errorHandler = require('./src/middleware/error.middleware');
// const initializeSocket = require('./src/socket/socket');

// const app = express();
// const server = http.createServer(app);

// const { socketMiddleware } = initializeSocket(server);

// connectDB();

// /*
// ====================================================
// MIDDLEWARE
// ====================================================
// */
// app.use(helmet());
// app.use(cors({
//   origin: [
//     process.env.CLIENT_URL,
//     'http://localhost:5173',
//     'https://univento.vercel.app'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });

// app.use(limiter);

// /*
// ====================================================
// SOCKET
// ====================================================
// */
// app.use(socketMiddleware);

// /*
// ====================================================
// ROUTES  ✅ IMPORTANT CHANGE HERE
// ====================================================
// */
// app.use('/announcements', announcementRoutes);

// /*
// ====================================================
// HEALTH
// ====================================================
// */
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'ok',
//     service: 'notification-service'
//   });
// });

// /*
// ====================================================
// ERROR HANDLER
// ====================================================
// */
// app.use(errorHandler);

// /*
// ====================================================
// 404 HANDLER
// ====================================================
// */
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.originalUrl}`
//   });
// });

// /*
// ====================================================
// START SERVER
// ====================================================
// */
// const PORT = process.env.PORT || 8003;

// server.listen(PORT, () => {
//   console.log(`Notification service running on port ${PORT}`);
// });

// process.on('unhandledRejection', (err) => {
//   console.error(`Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });


const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/db.config');
const announcementRoutes = require('./src/routes/announcement.routes');
const notificationRoutes = require('./src/routes/notification.routes');
const errorHandler = require('./src/middleware/error.middleware');
const initializeSocket = require('./src/socket/socket');

const app = express();
const server = http.createServer(app);

const { socketMiddleware } = initializeSocket(server);

connectDB();

/*
====================================================
MIDDLEWARE
====================================================
*/
app.use(helmet());
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

/*
====================================================
SOCKET MIDDLEWARE
====================================================
*/
app.use(socketMiddleware);

/*
====================================================
ROUTES
====================================================
*/
app.use('/announcements', announcementRoutes);
app.use('/notifications', notificationRoutes);

/*
====================================================
HEALTH
====================================================
*/
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'notification-service'
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
404 HANDLER
====================================================
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

/*
====================================================
START SERVER
====================================================
*/
const PORT = process.env.PORT || 8003;

server.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});