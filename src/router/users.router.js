const router = require('express').Router();
const User = require('../model/users.model')

router.get('/users', (req, res) => {
    res.send(" I am a Router")
})

router.get('/users/:user_id', (req, res) => {
    res.send(" I am a Router")
})

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