
const express = require('express');
const quizRouter = express.Router();

const { bulkSaveQuizQuestion, getSubjectQuestion, calculateAndSaveScore, fetchAllSubjects } = require('../controllers/quizController');
const { verifyUser } = require('../middlewares/verifyUser');

// Save new quiz subject with questions
quizRouter.post('/addQuestions', bulkSaveQuizQuestion);
quizRouter.use(verifyUser)
quizRouter.get('/fetch-subjects',fetchAllSubjects)

//fetch questions and options array
quizRouter.get('/getQuestions', getSubjectQuestion);

quizRouter.post('/submitQuiz', calculateAndSaveScore);
module.exports = quizRouter;
