// // const User = require('../models/User');

// // /**
// //  * ====================================================
// //  * GET ALL USERS
// //  * ====================================================
// //  */
// // exports.getAllUsers = async (req, res, next) => {
// //   try {
// //     const users = await User.find().select('-password');

// //     res.status(200).json({
// //       success: true,
// //       count: users.length,
// //       data: users
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * ====================================================
// //  * GET USER BY ID
// //  * ====================================================
// //  */
// // exports.getUserById = async (req, res, next) => {
// //   try {
// //     const user = await User.findById(req.params.id).select('-password');

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'User not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: user
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * ====================================================
// //  * UPDATE USER ROLE
// //  * ====================================================
// //  */
// // exports.updateUserRole = async (req, res, next) => {
// //   try {
// //     const { role } = req.body;

// //     const validRoles = ['participant', 'organizer', 'admin'];
// //     if (!validRoles.includes(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Invalid role'
// //       });
// //     }

// //     const user = await User.findByIdAndUpdate(
// //       req.params.id,
// //       { role },
// //       { new: true, runValidators: true }
// //     ).select('-password');

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'User not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: 'User role updated successfully',
// //       data: user
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * ====================================================
// //  * ADMIN DASHBOARD STATS (SAFE VERSION)
// //  * ====================================================
// //  */
// // exports.getAdminStats = async (req, res, next) => {
// //   try {
// //     const totalUsers = await User.countDocuments();

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         totalUsers,
// //         systemHealth: "99.8%"
// //       }
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// const User = require('../models/User');

// /**
//  * ====================================================
//  * GET ALL USERS
//  * ====================================================
//  */
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().select('-password');

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ====================================================
//  * GET USER BY ID
//  * ====================================================
//  */
// exports.getUserById = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ====================================================
//  * UPDATE USER ROLE
//  * ====================================================
//  */
// exports.updateUserRole = async (req, res, next) => {
//   try {
//     const { role } = req.body;

//     const validRoles = ['participant', 'organizer', 'admin'];
//     if (!validRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid role'
//       });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User role updated successfully',
//       data: user
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ====================================================
//  * DELETE USER (NEW)
//  * ====================================================
//  */
// exports.deleteUser = async (req, res, next) => {
//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Prevent deleting admins
//     if (user.role === 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Admins cannot be deleted'
//       });
//     }

//     await user.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: 'User deleted successfully'
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ====================================================
//  * ADMIN DASHBOARD STATS
//  * ====================================================
//  */
// exports.getAdminStats = async (req, res, next) => {
//   try {
//     const totalUsers = await User.countDocuments();

//     res.status(200).json({
//       success: true,
//       data: {
//         totalUsers,
//         systemHealth: "99.8%"
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const User = require('../models/User');

/**
 * ====================================================
 * GET ALL USERS
 * ====================================================
 */
exports.getAllUsers = async (req, res, next) => {
  try {

    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ====================================================
 * GET USER BY ID
 * ====================================================
 */
exports.getUserById = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ====================================================
 * UPDATE USER ROLE
 * ====================================================
 */
exports.updateUserRole = async (req, res, next) => {
  try {

    const { role } = req.body;

    const validRoles = ['participant', 'organizer', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    /* PREVENT ADMIN FROM CHANGING THEIR OWN ROLE */

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ====================================================
 * DELETE USER
 * ====================================================
 */
exports.deleteUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    /* PREVENT ADMIN FROM DELETING THEMSELVES */

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    /* PREVENT DELETING ADMINS */

    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admins cannot be deleted'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ====================================================
 * ADMIN DASHBOARD STATS
 * ====================================================
 */
exports.getAdminStats = async (req, res, next) => {
  try {

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        systemHealth: "99.8%"
      }
    });

  } catch (error) {
    next(error);
  }
};