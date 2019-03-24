const router = require('express').Router();
const asyncMiddleware = require('../utils/asyncMiddleware');
const Survey = require('../models/survey');

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

module.exports = router;