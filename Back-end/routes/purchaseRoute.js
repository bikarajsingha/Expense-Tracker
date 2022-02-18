const express = require('express')

const purchaseController = require('../controllers/purchaseController')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/premium-membership', purchaseController.purchasePremium)
router.post('/update-transaction-status', purchaseController.updateTransaction)
router.get('/is-premium', purchaseController.isPremium)



module.exports = router