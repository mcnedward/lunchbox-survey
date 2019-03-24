const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  options: [String],
  answer: String,
  responses: [String]
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = {
  Question,
  QuestionSchema
}