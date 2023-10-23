const { Schema, model } = require('mongoose');
const cartItemSchema = require('./CartItem');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = model('Cart', cartSchema)

module.exports = Cart