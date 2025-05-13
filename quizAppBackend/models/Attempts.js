const mongoose = require('mongoose');

// easy,medium,hard,total
const statSchema = new mongoose.Schema({
    easy:{
        type:Number,
        required:true
    },
    medium:{
        type:Number,
        required:true
    },
    hard:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
})
const attemptSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
    },
    stats:{
        type: statSchema,
        required:true
    },
    time:{
      type:Date,
      default:Date.now
    }
})
const prevAttemptsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  prevAttempts: {
    type: [attemptSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  }
});

function arrayLimit(val) {
  return val.length <= 10;
}

const Attempts = mongoose.model('Attempts', prevAttemptsSchema);
module.exports = Attempts;
