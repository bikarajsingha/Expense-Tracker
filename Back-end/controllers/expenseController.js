const jwt = require('jsonwebtoken')

const userService = require('../services/userService')
const expenseService = require('../services/expenseService')

exports.postExpense = async(req, res) => {
    try {
        const { expense, description, category } = req.body

        await expenseService.createExpense(req.user, expense, description, category)
        
        return res.status(201).json({success: true})
    }catch(err) {
        return res.status(402).json({success: false, error: err})
    }
}

exports.getExpense = async(req, res) => {
    try {
        const expense = await expenseService.getUserExpense(req.user)
        
        return res.json(expense)
    }catch(err) {
        console.log(err)
        return res.status(500).json({success: false})
    }

}