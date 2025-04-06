const { Schema, model } = require('mongoose')

const productType = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

const ProductType = model('ProductType', productType)

module.exports = ProductType