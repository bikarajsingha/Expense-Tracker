const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const userService = require('../services/userService')

exports.postSignUp = async (req, res) => {
    try {
        const { name, email, number, password } = req.body

        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(password, salt)
        
        await userService.signUp(name, email, number, passwordEncrypted)

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

exports.authenticate = async(req, res, next) => {
    try {
        const token = req.header('authorization')
        
        const userId = Number(jwt.verify(token, process.env.TOKEN_SECRET).id)
        req.user = await userService.findUser(userId)
        next()
    }catch(err) {
        return res.status(404).json({success: false})
    }
}

exports.postExpense = async(req, res) => {
    try {
        const { expense, description, category } = req.body

        const expenseDetails = await userService.createExpense(req.user, expense, description, category)
        
        return res.status(201).json({expenseDetails, success: true})
    }catch(err) {
        return res.status(402).json({success: false, error: err})
    }
}