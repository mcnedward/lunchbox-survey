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
  console.log('Finding survey with id: ' + req.params.id)

  res.json({});
}));

module.exports = router;