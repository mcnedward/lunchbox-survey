const router = require('express').Router();
const asyncMiddleware = require('../utils/asyncMiddleware');
const Survey = require('../models/survey');
const SurveyResponse = require('../models/surveyResponse');

// Gets all surveys
router.get('/surveys', asyncMiddleware(async (req, res) => {
  console.log('Finding surveys')

  // await Survey.create({ name: 'From API', questions: [] });
  let surveys = await Survey.find().exec();
  console.log(surveys)
  res.json(surveys);
}));

router.get('/surveys/:id', asyncMiddleware(async (req, res) => {
  const id = req.params.id
  console.log('Finding survey with id: ' + id)

  let survey = await Survey.findOne({ _id: id }).exec();

  res.json(survey);
}));

router.post('/surveys', asyncMiddleware(async (req, res) => {
  const surveyResponse = req.body;
  if (surveyResponse == null) {
    res.status(400);
    return res.send('You need to provide a response to the survey.');
  }
  console.log('Responding to survey with id', surveyResponse)

  let result = SurveyResponse.create(surveyResponse);
  res.json(result);
}))

module.exports = router;