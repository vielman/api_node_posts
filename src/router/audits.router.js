const router = require('express').Router();
const auditController = require('../controllers/audits.controller');
const verifyToken  = require('../middleware/vaidateJWT');

router.get('/audits', auditController.findAll);

router.get('/audits/:audit_id', verifyToken, auditController.findOne);

module.exports = router;
