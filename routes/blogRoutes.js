const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')


router.get('/', blogController.blogIndex)


//spesifik bir id için yazıyı getir
router.get('/:id', blogController.blogId)

module.exports = router