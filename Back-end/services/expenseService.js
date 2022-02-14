
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