const { Schema } = require('mongoose')

const cartItemSchema = new Schema({
    name: String,
    image: String,
    stripeProductId: {
        type: String,
        required: true,
    },
    price: Number
})

module.exports = cartItemSchema