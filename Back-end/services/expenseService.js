const Expense = require("../models/expense")

exports.createExpense = (user, exp, des, cat) => {
    return user.createExpense({
        amount: exp,
        description: des,
        category: cat
    })
}

exports.getUserExpense = (user) => {
    return user.getExpenses()
}

exports.postDeleteExpense = (ExpenseId) => {
    return Expense.destroy({ where: {id: ExpenseId}})
}