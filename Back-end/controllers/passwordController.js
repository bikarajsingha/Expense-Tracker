const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_KEY)

exports.forgetPasswordMail = async (req, res) => {
    try{
        const { email } = req.body

        const message = {
            to: 'samy21100@gmail.com',
            from: 'bikarajsingha@gmail.com',
            subject: 'Hello from sendgrid',
            text: 'Hello my friend',
            html: '<h1>Hello my friend</h1>'
        }
        
        const response = await sgMail.send(message)
        console.log(response)
        return res.status(200).json({success: true, response})
    }catch(err) {
        console.log(err)
        res.staus(500).json({success: false})
    }
}


