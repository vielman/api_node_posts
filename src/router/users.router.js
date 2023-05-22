const router = require('express').Router();
const userController = require('../controllers/users.controller');
const verifyToken  = require('../middleware/vaidateJWT');

router.get('/users', verifyToken, userController.findAll);

router.get('/users/:user_id', verifyToken, userController.findOne);

router.post('/users', verifyToken, userController.create);

router.put('/users/:user_id', verifyToken, userController.update);

router.delete('/users/:user_id', verifyToken, userController.deleteUsers);

router.post('/login', userController.signIn);

module.exports = router;
