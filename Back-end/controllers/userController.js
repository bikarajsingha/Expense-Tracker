const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userService = require('../services/userService')
const leaderBoardService = require('../services/leaderBoardService')

require('dotenv').config()

exports.postSignUp = async (req, res) => {
    try {
        const { name, email, number, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(password, salt)
        
        const user = await userService.signUp(name, email, number, passwordEncrypted)
        await leaderBoardService.createBoardRow(user, name)

        return res.status(201).json({message: 'Successfully signed up'})
    }catch(err) {
        return res.status(403).json({message: 'Unable to create new user'})
    }
}

exports.postLogIn = async (req, res) => {
    try{
        const { email, password } = req.body
    
        const user = await userService.logIn(email)
        if(user.length < 1) return res.status(404).json({message: 'User not found'})
    
        bcrypt.compare(password, user[0].password, (err, result) => {
            if(err) {
                return res.status(500).json('Something went wrong')
            }
            if(result){
                const jwttoken = jwt.sign({ id: user[0].id }, process.env.TOKEN_SECRET)
                return res.status(200).json({token: jwttoken, success: true})
            }else {
                return res.status(401).json({message: 'User not authorized'})
            }
        })
    }catch(err) {
        return res.status(500).json('Something went wrong')
    }
}
