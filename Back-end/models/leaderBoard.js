const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const LeaderBoard = sequelize.define('leaderBoard', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    totalExpense: {
        type: Sequelize.INTEGER
    }
})

module.exports = LeaderBoard