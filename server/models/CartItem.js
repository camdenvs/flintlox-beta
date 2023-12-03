const { Schema } = require('mongoose')

const cartItemSchema = new Schema({
    name: String,
    stripeProductId: {
        type: String,
        required: true,
    },
    price: Number
})

module.exports = cartItemSchema