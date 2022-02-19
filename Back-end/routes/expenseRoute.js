const express = require('express')

const expenseController = require('../controllers/expenseController')
const leaderBoardmiddleware = require('../middlewares/leaderBoard')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/addexpense', leaderBoardmiddleware.updateAmount, expenseController.postExpense)
router.get('/allexpense', expenseController.getExpense)

module.exports = router



