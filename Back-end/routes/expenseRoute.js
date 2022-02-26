const express = require('express')

const expenseController = require('../controllers/expenseController')
const leaderBoardmiddleware = require('../middlewares/leaderBoard')

const router = express.Router()

router.post('/addexpense', leaderBoardmiddleware.updateAmount, expenseController.postExpense)
router.get('/allexpense', expenseController.getExpense)
router.post('/delete/', expenseController.delExpense)

module.exports = router



