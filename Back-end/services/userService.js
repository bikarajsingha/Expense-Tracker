const User = require('../models/user')

exports.postSignUp = (req, res) => {
    
    User.create({
        name: name,
        email: email,
        password: password
    })
}