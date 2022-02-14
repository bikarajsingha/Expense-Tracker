const User = require('../models/user')

exports.signUp = (name, email, number, password) => {
    return User.create({
        name: name,
        email: email,
        number: number,
        password: password
    })
}

exports.logIn = (email) => {
    return User.findAll({ where: {email: email}})
}

exports.findUser = (id) => {
    return User.findByPk(id)
}

