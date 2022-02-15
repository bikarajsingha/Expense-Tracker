const express = require('express')

const passwordController = require('../controllers/passwordController')

const router = express.Router()

router.post('/forgotpassword', passwordController.forgetPasswordMail)


module.exports = router