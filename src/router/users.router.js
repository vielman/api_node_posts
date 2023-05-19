const router = require('express').Router();
const userController = require('../controllers/users.controller')


router.get('/users', userController.findAll)

router.get('/users/:user_id',  userController.findOne)

router.post('/users', (req, res) => {
    res.send(" I am a Router")
})

router.put('/users/:user_id', (req, res) => {
    res.send(" I am a Router")
})

router.delete('/users/:user_id', (req, res) => {
    res.send(" I am a Router")
})

module.exports = router;