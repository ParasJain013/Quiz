
const express = require('express');
const { fetchLeaderboardData } = require('../controllers/leaderboardController');
const { verifyUser } = require('../middlewares/verifyUser');
const leaderboardRouter = express.Router();


leaderboardRouter.use(verifyUser)
//fetch leaderboard data
leaderboardRouter.get('/getLeaderboard', fetchLeaderboardData)
module.exports = leaderboardRouter;
