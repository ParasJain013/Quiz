
const express = require('express');
const quizRouter = express.Router();

const { bulkSaveQuizQuestion, getSubjectQuestion, calculateAndSaveScore } = require('../controllers/quizController');

// Save new quiz subject with questions
quizRouter.post('/addQuestions', bulkSaveQuizQuestion);

//fetch questions and options array
quizRouter.get('/getQuestions', getSubjectQuestion);

quizRouter.post('/submitQuiz', calculateAndSaveScore);
module.exports = quizRouter;
