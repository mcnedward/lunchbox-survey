const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./question');

const AnswerSchema = new Schema({
  questionId: {
    type: String,
    required: [true, 'QuestionId is required']
  },
  answer: String
})

const SurveyResponseSchema = new Schema({
  surveyId: {
    type: String,
    required: [true, 'SurveyId is required']
  },
  answers: [AnswerSchema]
})

const SurveyResponse = mongoose.model('surveyResponse', SurveyResponseSchema);

module.exports = SurveyResponse;