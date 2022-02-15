const sgMail = require('@sendgrid/mail')

sgMail.setApitkey(process.env.SENDGRID_KEY)

exports.forgetPasswordMail = async(req, res) => {
    try{
        const receiver = req.body.email

        const message = {
            to: receiver,
            from: 'bikarajsingha@gmail.com',
            subject: 'Hello from sendgrid',
            text: 'Hello my friend',
            html: '<h1>Hello my friend</h1>'
        }
        
        await sgMail.send(message)

        return res.status(200).json({res})
    }catch(err) {
        res.staus(500).json({success: false})
    }

}


