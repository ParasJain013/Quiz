
const express = require('express');
const { fetchLeaderboardData } = require('../controllers/leaderboardController');
const { verifyUser } = require('../middlewares/verifyUser');
const leaderboardRouter = express.Router();

//fetch leaderboard data

leaderboardRouter.use(verifyUser)
leaderboardRouter.get('/getLeaderboard', fetchLeaderboardData)
module.exports = leaderboardRouter;
