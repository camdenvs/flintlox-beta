const { Schema } = require('mongoose')

const cartItemSchema = new Schema({
    stripeProductId: {
        type: String,
        required: true,
    },
    price: Number
})

module.exports = cartItemSchema