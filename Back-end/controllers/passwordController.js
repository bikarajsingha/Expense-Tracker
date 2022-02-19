const NodeMailer = require('nodemailer')

require('dotenv').config()

exports.forgetPasswordMail = async (req, res) => {
    try{
        const { email } = req.body
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
            subject: 'Hello from NODEMAILER',
            text: 'Hi, this was sent from NodeJs and NodeMailer'
        }

        const response = await transporter.sendMail(message)
        return res.status(200).json({success: true, response})
    }catch(err) {
        console.log(err)
        res.status(500).json({success: false})
    }
}


