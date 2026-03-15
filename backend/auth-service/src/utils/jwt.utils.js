const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for a user
 * Includes user basic identity fields for microservices
 */
exports.generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      role: user.role,
      college: user.college,
      firstName: user.firstName,
      lastName: user.lastName
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1d' }
  );
};

/**
 * Generate refresh token
 */
exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};

/**
 * Verify refresh token
 */
exports.verifyRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken, 
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
  );
};