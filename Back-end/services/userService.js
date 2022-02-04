const User = require('../models/user')

exports.signUp = (name, email, password) => {
    User.create({
        name: name,
        email: email,
        password: password
    })
    .then(_ => {
        return {message: 'succesful'}
    })
    .catch()
}