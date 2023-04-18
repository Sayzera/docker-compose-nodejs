const express = require('express')
const router = express.Router()
const { getAllPosts, createPost, getOnePost, deletePost, updatePost } =
  (PostController = require('../controllers/PostController'))

router.get('/', getAllPosts)
router.get('/:id', getOnePost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router
