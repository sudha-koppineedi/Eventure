// // const express = require('express');
// // const router = express.Router();

// // const {
// //   getAllUsers,
// //   getUserById,
// //   updateUserRole,
// //   getAdminStats
// // } = require('../controllers/admin.controller');

// // const { protect, authorize } = require('../middleware/auth.middleware');

// // router.use(protect);
// // router.use(authorize('admin'));

// // router.get('/users', getAllUsers);
// // router.get('/users/:id', getUserById);
// // router.put('/users/:id/role', updateUserRole);
// // router.get('/stats', getAdminStats);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();

// const {
//   getAllUsers,
//   getUserById,
//   updateUserRole,
//   deleteUser,
//   getAdminStats
// } = require('../controllers/admin.controller');

// const { protect, authorize } = require('../middleware/auth.middleware');

// router.use(protect);
// router.use(authorize('admin'));

// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);

// router.put('/users/:id/role', updateUserRole);

// /* NEW DELETE ROUTE */
// router.delete('/users/:id', deleteUser);

// router.get('/stats', getAdminStats);

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAdminStats
} = require('../controllers/admin.controller');

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/role', updateUserRole);

/* DELETE USER ROUTE */
router.delete('/users/:id', deleteUser);

router.get('/stats', getAdminStats);

module.exports = router;