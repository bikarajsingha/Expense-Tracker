const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()

router.post('/sign-up', userController.postSignUp)


module.exports = router