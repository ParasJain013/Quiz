// routes/quizSubjectRoutes.js
const express = require('express');
const { fetchLeaderboardData } = require('../controllers/leaderboardController');
const leaderboardRouter = express.Router();


leaderboardRouter.get('/getLeaderboard', fetchLeaderboardData)
module.exports = leaderboardRouter;
