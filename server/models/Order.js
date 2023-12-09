const { Schema, model } = require('mongoose');
const cartItemSchema = require('./CartItem');

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: {
        type: [String],
        required: true,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

const Order = model('Order', orderSchema)

module.exports = Order