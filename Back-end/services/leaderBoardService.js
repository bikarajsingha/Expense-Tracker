const LeaderBoard = require('../models/leaderBoard')

exports.createBoardRow = (user, username) => {
    return user.createLeaderBoard({ name: username})
}

exports.updateExpenseAmount = (user, value) => {
    return user.getLeaderBoard()
    .then(row => {
        let expense = row.dataValues.totalExpense
        value = Number(value)

        if(expense) expense += value

        row.update({totalExpense: expense})
    })
}

exports.getBoardRow = (user) => {
    return LeaderBoard.findAll({
        order: [
            ['totalExpense', 'DESC']
        ]
    })
}

