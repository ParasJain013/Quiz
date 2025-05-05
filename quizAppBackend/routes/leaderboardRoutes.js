
const express = require('express');
const { fetchLeaderboardData } = require('../controllers/leaderboardController');
const leaderboardRouter = express.Router();

//fetch leaderboard data
leaderboardRouter.get('/getLeaderboard', fetchLeaderboardData)
module.exports = leaderboardRouter;
