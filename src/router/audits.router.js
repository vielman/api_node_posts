const router = require('express').Router();
const auditController = require('../controllers/audits.controller')


router.get('/audits', auditController.findAll);

router.get('/audits/:audit_id',  auditController.findOne);

module.exports = router;