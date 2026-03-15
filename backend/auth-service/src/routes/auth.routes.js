const express = require('express');

const {
  register,
  login,
  getCurrentUser,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  googleAuth
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

/*
==============================
Public Routes
==============================
*/

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);

// FIXED: changed POST → PUT
router.put('/reset-password/:token', resetPassword);

router.post('/google', googleAuth);

/*
==============================
Protected Routes
==============================
*/

router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateProfile);

module.exports = router;