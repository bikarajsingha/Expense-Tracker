const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const ForgetPasswordRequest = sequelize.define('forgetPasswordRequest', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    isActive: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = ForgetPasswordRequest