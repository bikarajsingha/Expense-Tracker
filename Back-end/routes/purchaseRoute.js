const express = require('express')

const purchaseController = require('../controllers/purchaseController')
const auth = require('../middlewares/auth')

const router = express.Router()

router.use('/*', auth.authenticate)
router.get('/premium-membership', purchaseController.purchasePremium)
router.post('/update-transaction-status', purchaseController.updateTransaction)

module.exports = router