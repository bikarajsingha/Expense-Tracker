const Order = require('../models/order')

exports.createOrder = (user, id) => {
    return user.createOrder({
        orderId: id,
        status: 'PENDING'
    })
}

exports.transaction = (order_id, payment_id) => {
    return Order.findOne({ where: {orderId: order_id}})
    .then(order => {
        order.update({ paymentId: payment_id, status: 'SUCCESSFUL'})
    })
}