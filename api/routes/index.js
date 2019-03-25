const router = require('express').Router();
const asyncMiddleware = require('../utils/asyncMiddleware');
const Survey = require('../models/survey');
const SurveyResponse = require('../models/surveyResponse');

// Gets all surveys
router.get('/surveys', asyncMiddleware(async (req, res) => {
  let surveys = await Survey.find().exec();
  console.log(surveys)
  res.json(surveys);
}));

router.get('/surveys/:id', asyncMiddleware(async (req, res) => {
  const id = req.params.id

  let survey = await Survey.findOne({ _id: id }).exec();
  res.json(survey);
}));

router.post('/surveys', asyncMiddleware(async (req, res) => {
  const survey = req.body;
  if (survey == null) {
    res.status(400);
    return res.send('You need to provide data for the survey.');
  }

  let result = await Survey.create(survey);
  res.json(result);
}));

router.get('/surveyresponses/:id', asyncMiddleware(async (req, res) => {
  const id = req.params.id
  console.log('Finding surveyResponse with id: ' + id)
  
  let surveyResponse = await SurveyResponse.find({ surveyId: id }).exec();
  res.json(surveyResponse);
}));

router.post('/surveyresponses', asyncMiddleware(async (req, res) => {
  const surveyResponse = req.body;
  if (surveyResponse == null) {
    res.status(400);
    return res.send('You need to provide a response to the survey.');
  }

  let result = await SurveyResponse.create(surveyResponse);
  res.json(result);
}));

module.exports = router;