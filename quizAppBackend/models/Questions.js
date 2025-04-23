const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // import UUID

// Option Schema
const OptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
}, { _id: false });

// Question Schema
const QuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  q: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    required: true,
    validate: [arr => arr.length === 4, 'Exactly 4 options are required'],
  },
  correctId: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
}, { _id: false });

// Subject Schema
const QuizSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // e.g., "Geography"
  },
  questions: {
    type: [QuestionSchema],
    default: [],
  },
});

module.exports = mongoose.model('QuizSubject', QuizSubjectSchema);
