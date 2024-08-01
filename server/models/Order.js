const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const orderItem = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stripeProductId: {
        type: String,
        required: true
    }
})

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [orderItem],
    date_added: {
        type: String,
        default: dateFormat(Date.now, { monthLength: 'short'})
    },
    shipping_status: {
        type: String,
        default: 'ordered'
    },
    invoice: {
        type: String,
        required: true
    }
});

const Order = model('Order', orderSchema)

module.exports = Order