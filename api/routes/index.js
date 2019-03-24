const router = require('express').Router();
const asyncMiddleware = require('../utils/asyncMiddleware');
  
// Gets all surveys
router.get('/surveys', asyncMiddleware(async (req, res) => {
  res.json([]]);
}));

module.exports = router;