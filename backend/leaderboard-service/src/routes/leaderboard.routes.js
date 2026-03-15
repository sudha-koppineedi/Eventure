// // const express = require('express');
// // const router = express.Router();

// // const {
// //   initializeParticipant,
// //   getEventLeaderboard,
// //   updateParticipantScore,
// //   getParticipantScore,
// //   getTopPerformers,
// //   getCollegeLeaderboard
// // } = require('../controllers/leaderboard.controller');

// // const { protect, authorize } = require('../middleware/auth.middleware');

// // /*
// // ====================================================
// // INITIALIZE PARTICIPANT
// // ====================================================
// // */
// // router.post(
// //   '/event/:eventId/user/:userId',
// //   protect,
// //   initializeParticipant
// // );

// // /*
// // ====================================================
// // GET EVENT LEADERBOARD
// // ====================================================
// // */
// // router.get(
// //   '/event/:eventId',
// //   protect,
// //   getEventLeaderboard
// // );

// // /*
// // ====================================================
// // GET PARTICIPANT SCORE
// // ====================================================
// // */
// // router.get(
// //   '/event/:eventId/user/:userId',
// //   protect,
// //   getParticipantScore
// // );

// // /*
// // ====================================================
// // UPDATE PARTICIPANT SCORE
// // ====================================================
// // */
// // router.put(
// //   '/event/:eventId/user/:userId',
// //   protect,
// //   // authorize('admin', 'organizer'),
// //   updateParticipantScore
// // );

// // /*
// // ====================================================
// // GET TOP PERFORMERS
// // ====================================================
// // */
// // router.get(
// //   '/top-performers',
// //   protect,
// //   getTopPerformers
// // );

// // /*
// // ====================================================
// // GET COLLEGE LEADERBOARD
// // ====================================================
// // */
// // router.get(
// //   '/college-leaderboard',
// //   protect,
// //   getCollegeLeaderboard
// // );

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   initializeParticipant,
//   getEventLeaderboard,
//   updateParticipantScore,
//   getTopPerformers,
//   getCollegeLeaderboard
// } = require("../controllers/leaderboard.controller");

// router.post("/initialize", initializeParticipant);

// router.get("/event/:eventId", getEventLeaderboard);

// router.put("/event/:eventId/user/:userId", updateParticipantScore);

// router.get("/top-performers", getTopPerformers);

// router.get("/college-leaderboard", getCollegeLeaderboard);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  initializeParticipant,
  getEventLeaderboard,
  updateParticipantScore,
  getTopPerformers,
  getCollegeLeaderboard
} = require("../controllers/leaderboard.controller");

/*
INITIALIZE PARTICIPANT
*/
router.post("/initialize", initializeParticipant);

/*
EVENT LEADERBOARD
*/
router.get("/event/:eventId", getEventLeaderboard);

/*
UPDATE PARTICIPANT SCORE
*/
router.put("/event/:eventId/user/:userId", updateParticipantScore);

/*
TOP PERFORMERS
*/
router.get("/top-performers", getTopPerformers);

/*
COLLEGE LEADERBOARD
*/
router.get("/college-leaderboard", getCollegeLeaderboard);

module.exports = router;