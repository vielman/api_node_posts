const router = require('express').Router();
const postController = require('../controllers/posts.controller');
const verifyToken  = require('../middleware/vaidateJWT');

router.get('/posts', postController.findAll);

router.get('/posts/:post_id',  postController.findOne);

router.post('/posts', verifyToken, postController.create);

router.put('/posts/:post_id', verifyToken, postController.update);

router.delete('/posts/:post_id', verifyToken, postController.deletePosts);

router.get('/posts/:from_date/:to_date', verifyToken, postController.findByDateRange);

module.exports = router;
