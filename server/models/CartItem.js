const { Schema } = require('mongoose')

const cartItemSchema = new Schema({
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
})

module.exports = cartItemSchema