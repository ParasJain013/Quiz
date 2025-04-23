const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now, // When the entry was added or updated
  },
  latestScore: {
    type: Number,
    required: true,
  },
  highestScore: {
    type: Number,
    required: true,
  },
  latestScoreDate: {
    type: Date,
    default: Date.now,
  },
  highestScoreDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
