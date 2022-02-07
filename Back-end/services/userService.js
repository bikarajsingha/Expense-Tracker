const User = require('../models/user')

exports.signUp = (name, email, number, password) => {
    return User.create({
        name: name,
        email: email,
        number: number,
        password: password
    })
}