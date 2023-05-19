const router = require('express').Router();
const rolesController = require('../controllers/roles.controller')


router.get('/roles', rolesController.findAll)

router.get('/roles/:rol_id',  rolesController.findOne)



module.exports = router;