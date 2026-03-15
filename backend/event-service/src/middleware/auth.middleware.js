const jwt = require('jsonwebtoken');

/**
 * Protect middleware
 * Verifies JWT token and attaches decoded user to req.user
 */
exports.protect = (req, res, next) => {
  try {
    console.log("====================================");
    console.log("Incoming request to protected route");
    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT_SECRET in Event Service:", process.env.JWT_SECRET);
    console.log("====================================");

    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      console.log("❌ No token found in header");
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified successfully");
    console.log("Decoded payload:", decoded);

    req.user = decoded;
    next();

  } catch (error) {
    console.log("❌ JWT Verification Error:", error.message);

    return res.status(401).json({
      success: false,
      message: 'Not authorized - Invalid token'
    });
  }
};


/**
 * Authorize middleware
 * Restricts access based on roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found in request'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' not authorized. Allowed roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};