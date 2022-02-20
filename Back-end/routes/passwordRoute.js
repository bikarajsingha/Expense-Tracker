const express = require('express')

const passwordController = require('../controllers/passwordController')

const router = express.Router()

router.post('/forgotpassword', passwordController.forgetPasswordMail)
router.get('/resetpassword/:uuid', passwordController.resetPassword)
router.post('/updatepassword', passwordController.updatePassword)

module.exports = router