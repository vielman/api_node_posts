const router = require('express').Router();
const scoreController = require('../controllers/scores.controller')

router.get('/scores', scoreController.findAll);

router.get('/scores/:score_id',  scoreController.findOne);

router.post('/scores', scoreController.create);

module.exports = router;
