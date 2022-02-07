const bcrypt = require('bcrypt')
const userService = require('../services/userService')

exports.postSignUp = async (req, res) => {
    try{
        const { name, email, number, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(password, salt)
        
        await userService.signUp(name, email, number, passwordEncrypted)

        return res.status(200).json({message: 'Successfully signed up'})
    }catch(err) {
        return res.status(403).json({message: 'Unable to create new user'})
    }
}