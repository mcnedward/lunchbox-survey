const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./question');

const SurveySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  questions: {
    type: [QuestionSchema],
    required: [true, 'Questions are required']
  },
  createdOn: Date
})

const Survey = mongoose.model('survey', SurveySchema);

module.exports = Survey;