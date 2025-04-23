// routes/quizSubjectRoutes.js
const express = require('express');
const quizRouter = express.Router();
const QuizSubject = require('../models/Questions');
const { bulkSaveQuizQuestion, getSubjectQuestion, calculateAndSaveScore } = require('../controllers/quizController');

// Save new quiz subject with questions
quizRouter.post('/addQuestions', bulkSaveQuizQuestion);

quizRouter.get('/getQuestions', getSubjectQuestion);
quizRouter.post('/submitQuiz', calculateAndSaveScore);
module.exports = quizRouter;
