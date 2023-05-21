const router = require('express').Router();
const rolesController = require('../controllers/roles.controller')


router.get('/roles', rolesController.findAll);

router.get('/roles/:rol_id',  rolesController.findOne);

router.post('/roles', rolesController.create);

router.put('/roles/:rol_id', rolesController.update);



module.exports = router;