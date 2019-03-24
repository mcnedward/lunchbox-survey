const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./question');

const SurveyResponseSchema = new Schema({
  surveyId: {
    type: String,
    required: [true, 'SurveyId is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  questions: {
    type: [QuestionSchema],
    required: [true, 'Questions are required']
  }
})

const SurveyResponse = mongoose.model('surveyResponse', SurveyResponseSchema);

module.exports = SurveyResponse;