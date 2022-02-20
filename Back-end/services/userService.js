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

exports.updatePassword = (id, pass) => {
    return User.findByPk(id)
    .then(user => {
        user.update({
            password: pass
        })
    })
}

