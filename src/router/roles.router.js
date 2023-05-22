const router = require('express').Router();
const rolesController = require('../controllers/roles.controller')
const verifyToken  = require('../middleware/vaidateJWT');

router.get('/roles', rolesController.findAll);

router.get('/roles/:rol_id', verifyToken, rolesController.findOne);

router.post('/roles', verifyToken, rolesController.create);

router.put('/roles/:rol_id', verifyToken, rolesController.update);

module.exports = router;
