const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

const AUTH_SERVICE = 'http://localhost:8001';
const EVENT_SERVICE = 'http://localhost:8002';
const NOTIFICATION_SERVICE = 'http://localhost:8003';
const LEADERBOARD_SERVICE = 'http://localhost:8004';
const SETTINGS_SERVICE = 'http://localhost:8005';

/*
====================================================
AUTH SERVICE
====================================================
*/
app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE,
  changeOrigin: true
}));

/*
====================================================
EVENT SERVICE
====================================================
*/
app.use('/api/events', createProxyMiddleware({
  target: EVENT_SERVICE,
  changeOrigin: true,
  pathRewrite: (path) => {
    return path
      .replace(/^\/api\/events/, '/events')
      .replace(/\/$/, '');
  }
}));

/*
====================================================
NOTIFICATION SERVICE
====================================================
*/
app.use('/api/notifications', createProxyMiddleware({
  target: NOTIFICATION_SERVICE,
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/notifications/, '')
}));

/*
====================================================
LEADERBOARD SERVICE
====================================================
*/
app.use('/api/leaderboard', createProxyMiddleware({
  target: LEADERBOARD_SERVICE,
  changeOrigin: true
}));

/*
====================================================
SETTINGS SERVICE
====================================================
*/
app.use('/api/settings', createProxyMiddleware({
  target: SETTINGS_SERVICE,
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  }
}));

/*
====================================================
HEALTH CHECK
====================================================
*/
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/*
====================================================
START SERVER
====================================================
*/
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});