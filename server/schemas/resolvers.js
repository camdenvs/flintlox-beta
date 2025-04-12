const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order, Cart, ProductType } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        },
        user: async (parent, { username }) => {
            return await User.findOne({ username })
        },
        products: async (parent, { productType, ids }) => {
            if (ids) {
                return await Product.find({
                    _id: {
                        $in: ids
                    }
                })
            }
            if (productType) {
                return await Product.find({ productType: productType })
            }
            return await Product.find()
        },
        product: async (parent, { productId }) => {
            return await Product.findOne({ _id: productId })
        },
        productTypes: async () => {
            return await ProductType.find()
        },
        productType: async (parent, { productTypeId }) => {
            return await ProductType.findOne({ _id: productTypeId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        orders: async (parent, { userId }) => {
            console.log(userId)
            const orders = await Order.find({ userId: userId })
            console.log(orders)
            return orders
        },
        cart: async (parent, { userId }) => {
            return await Cart.findOne({ userId: userId })
        },
        checkout: async (parent, { items }, context) => {
            const url = new URL(context.headers.referer).origin
            const line_items = []

            for (let item of items) {
                const stripeProduct = await stripe.products.retrieve(item)
                line_items.push({
                    price: stripeProduct.default_price,
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA'],
                },
                payment_method_types: ['card'],
                line_items: line_items,
                mode: 'payment',
                success_url: `${url}/success`,
                cancel_url: `${url}/`,

            })

            return { session: session.id }
        }
    },

    Mutation: {
        createProduct: async (parent, { name, productType, listingURL, image }) => {
            return await Product.create({ name, productType, listingURL, image })
        },
        removeProduct: async (parent, { productId }) => {
            return await Product.findOneAndDelete({ _id: productId })
        },
        createProductType: async (parent, { name, subcategory, image, description }) => {
            return await ProductType.create({ name, subcategory, image, description })
        },
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password, cart: null });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addToCart: async (parent, { userId, image, name, stripeProductId, price }) => {
            const cart = await Cart.findOne({ userId: userId })
            if (cart) {
                return await Cart.findOneAndUpdate(
                    { userId: userId },
                    {
                        $addToSet: {
                            items: {
                                image: image,
                                name: name,
                                stripeProductId: stripeProductId,
                                price: price
                            }
                        },
                        $set: { total: cart.total + price }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
            }
            else {
                return await Cart.create({
                    userId: userId,
                    items: [{ stripeProductId: stripeProductId, price: price }],
                    total: price
                })
            }
        },
        removeFromCart: async (parent, { itemId, userId }) => {
            const cart = await Cart.findOne({ userId: userId })
            const itemIndex = cart.items.findIndex(p => p._id == itemId)
            return await cart.updateOne(
                {
                    $pull: {
                        items: { _id: itemId }
                    },
                    $set: {
                        total: (cart.total - Number(cart.items[itemIndex].price))
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
        },
        clearCart: async (parent, { userId }) => {
            return await Cart.findOneAndDelete(
                { userId: userId }
            )
        },
        addOrder: async (parent, { userId, stripeProductIds, invoice, names, images }) => {
            const user = await User.findOne({ userId: userId })
            const order = await Order.create({ userId: userId, items: [], invoice: invoice })
            order.update(
                {
                    $addToSet: {
                        items: {
                            name: names[i],
                            image: images[i],
                            stripeProductId: stripeProductIds[i]
                        }
                    }
                }
            )
            return await user.updateOne(
                {
                    $push: {
                        orders: order._id
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
        },
        lowerAvailability: async (parent, { stripeProductIds }) => {
            const products = []
            for (var i = 0; i < stripeProductIds.length; i++) {
                products.push(await Product.updateOne(
                    { "variants.stripeProductId": stripeProductIds[i] },
                    { $inc: { "variants.$.availableCount": -1 } }
                ))
            }
            return products
        }
    }
}

module.exports = resolvers
