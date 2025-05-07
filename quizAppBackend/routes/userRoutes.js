
const express = require('express');
const { login, signup, checkSession } = require('../controllers/userController');
const userRouter = express.Router();

//fetch leaderboard data
userRouter.post('/login', login)
userRouter.post('/signup', signup)
userRouter.get('/check-session', checkSession)
module.exports = userRouter;
