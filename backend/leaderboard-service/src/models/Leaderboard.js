const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required']
  },

  eventName: {
    type: String
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },

  userName: {
    type: String,
    required: [true, 'User name is required']
  },

  college: {
    type: String,
    trim: true
  },

  score: {
    type: Number,
    default: 0,
    min: [0, 'Score cannot be negative']
  },

  rank: {
    type: Number,
    default: 0
  },

  achievements: [{
    type: String,
    trim: true
  }],

  lastUpdated: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

leaderboardSchema.index({ eventId: 1, userId: 1 }, { unique: true });

leaderboardSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;