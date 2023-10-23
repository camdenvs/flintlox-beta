const { Schema, model } = require('mongoose')
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            default: 'other'
        },
        sizes: {
            type: String,
            default: ''
        },
        stripeProductId: {
            type: String,
            required: true
        }
    }
)

const Product = model('Product', productSchema)

// * The following commented code blocks are for the former MySQL model

// class Product extends Model {}

// Product.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         price: {
//             type: DataTypes.FLOAT,
//             allowNull: false
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         image: {
//             type: DataTypes.BLOB,
//             allowNull: false
//         },
//         category: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: 'other'
//         },
//         sizes: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: ''
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'product',
//     }
// )

module.exports = Product