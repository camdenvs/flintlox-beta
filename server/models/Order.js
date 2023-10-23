const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        },
        name: String,
        size: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

const Order = model('Order', orderSchema)

module.exports = Order