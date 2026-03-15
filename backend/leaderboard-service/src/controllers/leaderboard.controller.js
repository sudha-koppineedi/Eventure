// // const Leaderboard = require('../models/Leaderboard');

// // /*
// // ====================================================
// // INITIALIZE PARTICIPANT
// // ====================================================
// // */
// // exports.initializeParticipant = async (req, res, next) => {
// //   try {
// //     const { eventId, userId } = req.params;

// //     const existing = await Leaderboard.findOne({ eventId, userId });

// //     if (existing) {
// //       return res.status(200).json({
// //         success: true,
// //         message: 'Participant already initialized'
// //       });
// //     }

// //     const entry = await Leaderboard.create({
// //       eventId,
// //       userId,
// //       score: 0,
// //       rank: 0,
// //       achievements: [],
// //       college: req.body.college || 'Others'
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: 'Leaderboard entry created',
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET EVENT LEADERBOARD
// // ====================================================
// // */
// // exports.getEventLeaderboard = async (req, res, next) => {
// //   try {
// //     const leaderboard = await Leaderboard.find({
// //       eventId: req.params.eventId
// //     }).sort({ score: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: leaderboard.length,
// //       data: leaderboard
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET PARTICIPANT SCORE
// // ====================================================
// // */
// // exports.getParticipantScore = async (req, res, next) => {
// //   try {
// //     const entry = await Leaderboard.findOne({
// //       eventId: req.params.eventId,
// //       userId: req.params.userId
// //     });

// //     if (!entry) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Participant not found in leaderboard'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // UPDATE PARTICIPANT SCORE
// // ====================================================
// // */
// // exports.updateParticipantScore = async (req, res, next) => {
// //   try {
// //     const entry = await Leaderboard.findOneAndUpdate(
// //       {
// //         eventId: req.params.eventId,
// //         userId: req.params.userId
// //       },
// //       {
// //         score: req.body.score,
// //         achievements: req.body.achievements || []
// //       },
// //       { new: true }
// //     );

// //     if (!entry) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Participant not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET TOP PERFORMERS (OVERALL)
// // ====================================================
// // */
// // exports.getTopPerformers = async (req, res, next) => {
// //   try {
// //     const top = await Leaderboard.find()
// //       .sort({ score: -1 })
// //       .limit(10);

// //     res.status(200).json({
// //       success: true,
// //       data: top
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET COLLEGE LEADERBOARD
// // ====================================================
// // */
// // exports.getCollegeLeaderboard = async (req, res, next) => {
// //   try {
// //     const leaderboard = await Leaderboard.aggregate([
// //       {
// //         $group: {
// //           _id: '$college',
// //           totalScore: { $sum: '$score' },
// //           participantCount: { $sum: 1 },
// //           eventIds: { $addToSet: '$eventId' }
// //         }
// //       },
// //       {
// //         $project: {
// //           _id: 0,
// //           college: '$_id',
// //           totalScore: 1,
// //           participantCount: 1,
// //           eventCount: { $size: '$eventIds' }
// //         }
// //       },
// //       { $sort: { totalScore: -1 } }
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       data: leaderboard
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // const Leaderboard = require('../models/Leaderboard');

// // /*
// // ====================================================
// // INITIALIZE PARTICIPANT
// // ====================================================
// // */
// // exports.initializeParticipant = async (req, res, next) => {
// //   try {
// //     const { eventId, userId } = req.params;

// //     const existing = await Leaderboard.findOne({ eventId, userId });

// //     if (existing) {
// //       return res.status(200).json({
// //         success: true,
// //         message: 'Participant already initialized'
// //       });
// //     }

// //     const entry = await Leaderboard.create({
// //       eventId,
// //       userId,
// //       score: 0,
// //       rank: 0,
// //       achievements: [],
// //       college: req.body.college || 'Others'
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: 'Leaderboard entry created',
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET EVENT LEADERBOARD
// // ====================================================
// // */
// // exports.getEventLeaderboard = async (req, res, next) => {
// //   try {
// //     const leaderboard = await Leaderboard.find({
// //       eventId: req.params.eventId
// //     }).sort({ score: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: leaderboard.length,
// //       data: leaderboard
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET PARTICIPANT SCORE
// // ====================================================
// // */
// // exports.getParticipantScore = async (req, res, next) => {
// //   try {
// //     const entry = await Leaderboard.findOne({
// //       eventId: req.params.eventId,
// //       userId: req.params.userId
// //     });

// //     if (!entry) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Participant not found in leaderboard'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // UPDATE PARTICIPANT SCORE
// // ====================================================
// // */
// // exports.updateParticipantScore = async (req, res, next) => {
// //   try {
// //     const entry = await Leaderboard.findOneAndUpdate(
// //       {
// //         eventId: req.params.eventId,
// //         userId: req.params.userId
// //       },
// //       {
// //         score: req.body.score,
// //         achievements: req.body.achievements || []
// //       },
// //       { new: true }
// //     );

// //     if (!entry) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Participant not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: entry
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET TOP PERFORMERS (OVERALL)
// // ====================================================
// // */
// // exports.getTopPerformers = async (req, res, next) => {
// //   try {
// //     const top = await Leaderboard.find()
// //       .sort({ score: -1 })
// //       .limit(10);

// //     res.status(200).json({
// //       success: true,
// //       data: top
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /*
// // ====================================================
// // GET COLLEGE LEADERBOARD
// // ====================================================
// // */
// // exports.getCollegeLeaderboard = async (req, res, next) => {
// //   try {
// //     const leaderboard = await Leaderboard.aggregate([
// //       {
// //         $group: {
// //           _id: '$college',
// //           totalScore: { $sum: '$score' },
// //           participantCount: { $sum: 1 },
// //           eventIds: { $addToSet: '$eventId' }
// //         }
// //       },
// //       {
// //         $project: {
// //           _id: 0,
// //           college: '$_id',
// //           totalScore: 1,
// //           participantCount: 1,
// //           eventCount: { $size: '$eventIds' }
// //         }
// //       },
// //       { $sort: { totalScore: -1 } }
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       data: leaderboard
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // };

// const Leaderboard = require('../models/Leaderboard');

// /*
// ====================================================
// INITIALIZE PARTICIPANT
// ====================================================
// */
// exports.initializeParticipant = async (req, res, next) => {
//   try {

//     const { eventId, userId, userName, college } = req.body;

//     const existing = await Leaderboard.findOne({ eventId, userId });

//     if (existing) {
//       return res.status(200).json({
//         success: true,
//         message: 'Participant already initialized'
//       });
//     }

//     const entry = await Leaderboard.create({
//       eventId,
//       userId,
//       userName: userName || "Participant",
//       score: 0,
//       rank: 0,
//       achievements: [],
//       college: college || "Others"
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Leaderboard entry created',
//       data: entry
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// /*
// ====================================================
// GET EVENT LEADERBOARD
// ====================================================
// */
// exports.getEventLeaderboard = async (req, res, next) => {
//   try {

//     const leaderboard = await Leaderboard
//       .find({ eventId: req.params.eventId })
//       .sort({ score: -1 });

//     res.status(200).json({
//       success: true,
//       count: leaderboard.length,
//       data: leaderboard
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// /*
// ====================================================
// GET PARTICIPANT SCORE
// ====================================================
// */
// exports.getParticipantScore = async (req, res, next) => {
//   try {

//     const entry = await Leaderboard.findOne({
//       eventId: req.params.eventId,
//       userId: req.params.userId
//     });

//     if (!entry) {
//       return res.status(404).json({
//         success: false,
//         message: 'Participant not found in leaderboard'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: entry
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// /*
// ====================================================
// UPDATE PARTICIPANT SCORE
// ====================================================
// */
// exports.updateParticipantScore = async (req, res, next) => {

//   try {

//     const { eventId, userId } = req.params;
//     const { score, achievements, userName, college } = req.body;

//     let entry = await Leaderboard.findOne({
//       eventId,
//       userId
//     });

//     /*
//     CREATE ENTRY IF NOT EXISTS
//     */
//     if (!entry) {

//       entry = new Leaderboard({
//         eventId,
//         userId,
//         userName: userName || "Participant",
//         score: score || 0,
//         rank: 0,
//         achievements: achievements || [],
//         college: college || "Others"
//       });

//     } else {

//       entry.score = score;

//       if (achievements) {
//         entry.achievements = achievements;
//       }

//       if (userName) {
//         entry.userName = userName;
//       }

//       if (college) {
//         entry.college = college;
//       }

//     }

//     await entry.save();

//     res.status(200).json({
//       success: true,
//       data: entry
//     });

//   } catch (error) {

//     next(error);

//   }

// };


// /*
// ====================================================
// GET TOP PERFORMERS
// ====================================================
// */
// exports.getTopPerformers = async (req, res, next) => {
//   try {

//     const top = await Leaderboard
//       .find()
//       .sort({ score: -1 })
//       .limit(10);

//     res.status(200).json({
//       success: true,
//       data: top
//     });

//   } catch (error) {
//     next(error);
//   }
// };


// /*
// ====================================================
// GET COLLEGE LEADERBOARD
// ====================================================
// */
// exports.getCollegeLeaderboard = async (req, res, next) => {
//   try {

//     const leaderboard = await Leaderboard.aggregate([
//       {
//         $group: {
//           _id: '$college',
//           totalScore: { $sum: '$score' },
//           participantCount: { $sum: 1 },
//           eventIds: { $addToSet: '$eventId' }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           college: '$_id',
//           totalScore: 1,
//           participantCount: 1,
//           eventCount: { $size: '$eventIds' }
//         }
//       },
//       { $sort: { totalScore: -1 } }
//     ]);

//     res.status(200).json({
//       success: true,
//       data: leaderboard
//     });

//   } catch (error) {
//     next(error);
//   }
// };
const Leaderboard = require("../models/Leaderboard");

/*
INITIALIZE PARTICIPANT
*/
exports.initializeParticipant = async (req, res) => {

  try {

    const { eventId, userId, userName, college } = req.body;

    let existing = await Leaderboard.findOne({ eventId, userId });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Participant already initialized",
        data: existing
      });
    }

    const entry = await Leaderboard.create({
      eventId,
      userId,
      userName: userName || "Participant",
      score: 0,
      achievements: [],
      college: college || "Others"
    });

    res.status(201).json({
      success: true,
      data: entry
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to initialize participant"
    });

  }
};


/*
GET EVENT LEADERBOARD
*/
exports.getEventLeaderboard = async (req, res) => {

  try {

    const leaderboard = await Leaderboard
      .find({ eventId: req.params.eventId })
      .sort({ score: -1 });

    res.status(200).json({
      success: true,
      data: leaderboard
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard"
    });

  }

};


/*
UPDATE PARTICIPANT SCORE
*/
exports.updateParticipantScore = async (req, res) => {

  try {

    const { eventId, userId } = req.params;
    const { score, achievements, userName, college } = req.body;

    let entry = await Leaderboard.findOne({ eventId, userId });

    if (!entry) {

      entry = new Leaderboard({
        eventId,
        userId,
        userName: userName || "Participant",
        score: score || 0,
        achievements: achievements || [],
        college: college || "Others"
      });

    } else {

      entry.score = score;

      if (achievements) entry.achievements = achievements;
      if (userName) entry.userName = userName;
      if (college) entry.college = college;

    }

    await entry.save();

    res.status(200).json({
      success: true,
      data: entry
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update score"
    });

  }

};


/*
TOP PERFORMERS
*/
exports.getTopPerformers = async (req, res) => {

  try {

    const performers = await Leaderboard
      .find()
      .sort({ score: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: performers
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top performers"
    });

  }

};


/*
COLLEGE LEADERBOARD
*/
exports.getCollegeLeaderboard = async (req, res) => {

  try {

    const leaderboard = await Leaderboard.aggregate([
      {
        $group: {
          _id: "$college",
          totalScore: { $sum: "$score" },
          participantCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          college: "$_id",
          totalScore: 1,
          participantCount: 1
        }
      },
      {
        $sort: { totalScore: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: leaderboard
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch college leaderboard"
    });

  }

};