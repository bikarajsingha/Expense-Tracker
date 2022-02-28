const ForgetPasswordRequest = require('../models/forgetPasswordRequest')

exports.request = (user, uid, date) => { 
    return user.createForgetPasswordRequest({
        id: uid,
        isActive: date
    })
}

exports.getUser = (id) => {
    return ForgetPasswordRequest.findByPk(id)
}

