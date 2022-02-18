const { json } = require('body-parser')
const Razorpay = require('razorpay')

const purchaseService = require('../services/purchaseService')

require('dotenv').config()

const purchasePremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 250000

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) res.status(403).json({message: 'Something went wrong', error: err})

            purchaseService.createOrder(req.user, order.id)

            return res.status(201).json({ order, key_id: rzp.key_id})
        })

    }catch(err) {
        return res.status(403).json({message: 'Something went wrong', error: err})
    }
}

const isPremium = async(req, res) => {
    try { 
        const user = await purchaseService.hasSubscribed(req.user)
        
        if(user.length) return res.status(200).json({success: true})
    }catch(err) {
        console.log(err )
        return res.status(403).json('success: false')
    }
}

const updateTransaction = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body

        await purchaseService.transaction(order_id, payment_id)

        return res.status(202).json({success: true, message: "Transaction Successful"})
    }catch(err) {
        return res.status(403).json({error: err, message: 'Something went wrong'})
    }
}

module.exports = {
    purchasePremium,
    isPremium,
    updateTransaction
}