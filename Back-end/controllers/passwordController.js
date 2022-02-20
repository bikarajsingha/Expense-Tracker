const NodeMailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const userService = require('../services/userService')
const forgetPasswordRequestService = require('../services/forgetPasswordRequestService')

require('dotenv').config()

exports.forgetPasswordMail = async (req, res) => {
    try{
        const { email } = req.body
        const user = await userService.logIn(email)
        const id = uuidv4()

        if(!user.length) return res.status(404).json({success: false})

        let date = new Date()
        date.setMinutes(date.getMinutes() + 30)

        await forgetPasswordRequestService.request(user[0], id, date)

        const transporter = NodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.PASS
            }
        })
        const message = {
            from: 'developer211185@gmail.com',
            to: email,
            subject: 'Forget Password',
            text: 'Hi, this is your Reset Link',
            html: `<p>Hi, <br>This is your <b>reset link</b><br>It is only active for 30 minutes</p><a href="http://localhost:3000/password/resetpassword/${id}" style="width: 10px; padding: 15px 25px; color: white; background-color: rgb(113, 113, 238); border-radius: 2px; text-decoration: none;">RESET PASSWORD</a>`
        }
        const response = await transporter.sendMail(message)

        return res.status(200).json({success: true, response})
    }catch(err) {
        console.log(err)
        res.status(500).json({success: false})
    }
}

exports.resetPassword = async(req, res) => {
    try{
        const uid = req.params.uuid

        const user = await forgetPasswordRequestService.requestAuthentication(uid)
    
        if(user) return res.render('forgetPassword', {uid: uid})
    }catch(err) {
        console.log(err)
        return res.status(404).json({success: false, err})
    }
}

exports.updatePassword = async(req, res) => {
    try {
        const { uid, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(password, salt)
    
        let user = await forgetPasswordRequestService.getUser(uid)
        user = user.userId

        await userService.updatePassword(user, passwordEncrypted)

        return res.status(200).json({success: true})
    }catch(err) {
        console.log(err)
        return res.status(500).json({success: false})
    }

}

