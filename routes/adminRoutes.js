const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/', adminController.adminIndex)

router.get('/add', adminController.adminAdd)

router.post('/add', adminController.adminAddPost)

router.delete('/delete/:id', adminController.adminDelete)

router.get('/adminUsers', adminController.adminUsers)

module.exports = router