const bcrypt = require('bcrypt')
const userService = require('../services/userService')

exports.postSignUp = async function (req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const passwordEncrypted = await bcrypt.hash(password, salt)

    userService.signUp(name, email, passwordEncrypted)
}