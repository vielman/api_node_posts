const router = require('express').Router();
const postController = require('../controllers/posts.controller')


router.get('/posts', postController.findAll);

router.get('/posts/:post_id',  postController.findOne);

router.post('/posts', postController.create);

router.put('/posts/:post_id', postController.update);

router.delete('/posts/:post_id', postController.deletePosts);

module.exports = router;