const router = require('express').Router();
const postController = require('../controllers/posts.controller')


router.get('/posts', postController.findAll)

router.get('/posts/:post_id',  postController.findOne)

router.post('/posts', (req, res) => {
    res.send(" I am a Router")
})

router.put('/posts/:user_id', (req, res) => {
    res.send(" I am a Router")
})

router.delete('/posts/:user_id', (req, res) => {
    res.send(" I am a Router")
})

module.exports = router;