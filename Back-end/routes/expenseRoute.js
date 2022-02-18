const express = require('express')

const expenseController = require('../controllers/expenseController')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/addexpense', expenseController.postExpense)
router.get('/allexpense', expenseController.getExpense)

module.exports = router



