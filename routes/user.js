const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.get('/create-user', userController.getAddUser)
router.post('/create-user', userController.postAddUser)

module.exports = router