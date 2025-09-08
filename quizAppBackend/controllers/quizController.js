const QuizSubject = require("../models/Questions");
const { v4: uuidv4 } = require("uuid");
const { saveToLeaderboard } = require("./leaderboardController");
const { addToPrevAttempts } = require("./attemptsController");

//if collection of particular subject is already present then add the unique questions to the existing collection 
const saveIndividualQuestion = async (req, res) => {
  try {
    const { name, questions } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions must be a non-empty array" });
    }

    const subject = await QuizSubject.findOne({ name });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const existingQuestionsText = subject.questions.map((q) => q.q.trim().toLowerCase());

    const newQuestions = questions.filter(
      (q) => !existingQuestionsText.includes(q.q.trim().toLowerCase())
    );

    if (newQuestions.length === 0) {
      return res.status(409).json({ message: "All questions are duplicates" });
    }

    const enrichedQuestions = enrichQuestionsWithIds(newQuestions);
    subject.questions.push(...enrichedQuestions);
    await subject.save();

    res.status(200).json({ message: `${enrichedQuestions.length} question(s) added to subject '${name}'` });
  } catch (error) {
    console.error("Error saving individual questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const bulkSaveQuizQuestion = async (req, res) => {
  try {
    const { name, questions } = req.body;

    const existing = await QuizSubject.findOne({ name });
    //if collection a particular subject exists then add in the existing collection
    if (existing) {
      return saveIndividualQuestion(req, res);
    }

    //otherwise create new collection
    const enrichedQuestions = enrichQuestionsWithIds(questions);
    const newSubject = new QuizSubject({ name, questions: enrichedQuestions });
    await newSubject.save();

    res.status(201).json({ message: "Subject created and questions saved successfully!" });
  } catch (error) {
    console.error("Error saving subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSubjectQuestion = async (req, res) => {
  try {
    const subject = req.query.subject;
    let metadata = { easyCount: 0, mediumCount: 0, hardCount: 0 }
    if (!subject) {
      return res.status(400).json({ error: 'Subject is required in query params.' });
    }

    const subjectDoc = await QuizSubject.findOne({ name: subject }).select('-questions.correctId');

    if (!subjectDoc) {
      return res.status(404).json({ error: 'Subject not found in database.' });
    }
    subjectDoc.questions.forEach((q) => {
      if (q.difficulty == 'easy') {
        metadata.easyCount++;
      }
      else if (q.difficulty == 'medium') {
        metadata.mediumCount++;
      }
      if (q.difficulty == 'hard') {
        metadata.hardCount++;
      }
    })

    res.status(200).json({ subject: subjectDoc.name, questions: subjectDoc.questions, metadata });
  } catch (error) {
    console.error('Error fetching subject questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchAllSubjects = async (req, res) => {
  try {
    const subjects = await QuizSubject.find({}, 'name');
    const subjectNames = subjects.map(subject => subject.name);
    res.status(200).json({ subjects: subjectNames });
  } catch (err) {
    console.error('Error fetching subject names:', err);
    res.status(400).json({ message: "FAILED" });
  }
};



const calculateAndSaveScore = async (req, res) => {
  try {
    let easy = 0, medium = 0, hard = 0;
    const { subject, answers, user } = req.body;

    const { username, userId, email } = req.user

    if (!subject || !answers || typeof answers !== 'object' || !username) {
      return res.status(400).json({ error: 'Subject, answers and user are required.' });
    }

    const subjectDoc = await QuizSubject.findOne({ name: subject });
    if (!subjectDoc) {
      return res.status(404).json({ error: 'Subject not found in database.' });
    }

    const questions = subjectDoc.questions;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer === question.correctId) {
        if (question.difficulty === 'easy') easy++;
        else if (question.difficulty === 'medium') medium++;
        else if (question.difficulty === 'hard') hard++;
      }
    });

    const total = easy + medium + hard;

    await saveToLeaderboard(username, subject, total);
    await addToPrevAttempts(email, subject, { easy, medium, hard, total });

    return res.status(200).json({
      easy, medium, hard, total,
      message: 'Score calculated and saved successfully'
    });

  } catch (error) {
    console.error('Error calculating score:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// to add uniques ids to questions
const enrichQuestionsWithIds = (questions) => {
  return questions.map((q) => ({
    ...q,
    id: uuidv4(), // generate unique question ID
  }));
};


module.exports = { bulkSaveQuizQuestion, getSubjectQuestion, calculateAndSaveScore, fetchAllSubjects }