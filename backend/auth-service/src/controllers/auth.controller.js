const User = require('../models/User');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt.utils');
const { sendPasswordResetEmail } = require('../utils/email.utils');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');

/*
==============================
REGISTER USER
==============================
*/
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, college } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      college
    });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        college: user.college,
        role: user.role
      },
      token,
      refreshToken
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
UPDATE PROFILE
==============================
*/
exports.updateProfile = async (req, res, next) => {
  try {

    const { firstName, lastName, college } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (college) user.college = college;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        college: user.college,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
LOGIN USER
==============================
*/
exports.login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        college: user.college,
        role: user.role
      },
      token,
      refreshToken
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
GET CURRENT USER
==============================
*/
exports.getCurrentUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        college: user.college,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
REFRESH TOKEN
==============================
*/
exports.refreshToken = async (req, res, next) => {
  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    try {

      const decoded = verifyRefreshToken(refreshToken);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }

      const newToken = generateToken(user);

      res.status(200).json({
        success: true,
        token: newToken
      });

    } catch (error) {

      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });

    }

  } catch (error) {
    next(error);
  }
};


/*
==============================
LOGOUT
==============================
*/
exports.logout = async (req, res, next) => {
  try {

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
FORGOT PASSWORD
==============================
*/
exports.forgotPassword = async (req, res, next) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email address'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive a password reset link'
      });
    }

    const resetToken = user.generateResetToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendPasswordResetEmail({
      email: user.email,
      subject: 'Eventure Password Reset',
      message: 'You requested a password reset.',
      resetUrl
    });

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });

  } catch (error) {

    console.error("Password reset email error:", error);

    res.status(500).json({
      success: false,
      message: 'Failed to send password reset email'
    });

  }
};


/*
==============================
RESET PASSWORD
==============================
*/
exports.resetPassword = async (req, res, next) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const newToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      token: newToken,
      refreshToken
    });

  } catch (error) {
    next(error);
  }
};


/*
==============================
GOOGLE AUTH
==============================
*/
exports.googleAuth = async (req, res, next) => {
  try {

    const { idToken, college } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Google ID token is required'
      });
    }

    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({ idToken });

    const payload = ticket.getPayload();

    const { email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {

      const randomPassword =
        crypto.randomBytes(16).toString('hex') + 'Aa1!';

      user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        password: randomPassword,
        college
      });

    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        college: user.college,
        role: user.role,
        photo: picture
      },
      token,
      refreshToken
    });

  } catch (error) {
    next(error);
  }
};