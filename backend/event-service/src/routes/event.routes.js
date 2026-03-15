const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
  getEventStats,
  getEventParticipants
} = require("../controllers/event.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

/*
====================================================
IMPORTANT RULE:
Specific routes FIRST
Dynamic routes LAST
====================================================
*/

/*
====================================================
EVENT STATS
GET /events/stats
====================================================
*/
router.get(
  "/stats",
  protect,
  authorize("admin", "organizer"),
  getEventStats
);

/*
====================================================
GET ALL EVENTS
GET /events
====================================================
*/
router.get("/", getAllEvents);

/*
====================================================
CREATE EVENT
POST /events
====================================================
*/
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createEvent
);

/*
====================================================
GET PARTICIPANTS
GET /events/:id/participants
====================================================
*/
router.get(
  "/:id/participants",
  protect,
  authorize("admin", "organizer"),
  getEventParticipants
);

/*
====================================================
REGISTER FOR EVENT
POST /events/:id/register
====================================================
*/
router.post(
  "/:id/register",
  protect,
  authorize("participant"),
  registerForEvent
);

/*
====================================================
CANCEL REGISTRATION
POST /events/:id/cancel
====================================================
*/
router.post(
  "/:id/cancel",
  protect,
  authorize("participant"),
  cancelRegistration
);

/*
====================================================
UPDATE EVENT
PUT /events/:id
====================================================
*/
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  updateEvent
);

/*
====================================================
DELETE EVENT
DELETE /events/:id
====================================================
*/
router.delete(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  deleteEvent
);

/*
====================================================
GET SINGLE EVENT
GET /events/:id
⚠ MUST BE LAST
====================================================
*/
router.get("/:id", getEventById);

module.exports = router;