
const express = require('express');
const { verifyUser } = require('../middlewares/verifyUser');
const { getPrevAttempts } = require('../controllers/attemptsController');
const attemptsRouter = express.Router();


attemptsRouter.use(verifyUser)

attemptsRouter.get('/previous-attempts', getPrevAttempts)
module.exports = attemptsRouter;
