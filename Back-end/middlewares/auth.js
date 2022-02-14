const jwt = require('jsonwebtoken')

const userService = require('../services/userService')

require('dotenv').config()

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