const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order, Cart } = require('../models');
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
        products: async (parent, { subcategory }) => {
            const params = subcategory ? { subcategory } : {}
            return await Product.find(params)
        },
        product: async (parent, { productId }) => {
            return await Product.findOne({ _id: productId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        orders: async (parent, args) => {
            if (args.userId) {
                return await Order.find({ userId: args.userId })
            } else {
                return await Order.find().sort({ dateAdded: 1 })
            }
        },
        cart: async (parent, { userId }) => {
            return await Cart.findOne({ userId: userId })
        },
        checkout: async (parent, { cartId }, context) => {
            const cart = await Cart.findOne({ _id: cartId })
            const url = new URL(context.headers.referer).origin

            const line_items = []

            for (let item of cart.items) {
                const stripeProduct = await stripe.products.retrieve(item.stripeProductId)
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
        createProduct: async (parent, { name, price, description, image, category, sizes }) => {
            const stripeProduct = await stripe.products.create({
                name: name,
                description: description,
                default_price_data: {
                    unit_amount: price * 100,
                    currency: 'usd',
                }
            })
            return await Product.create({ name, price, description, image, category, sizes, stripeProductId: stripeProduct.id })
        },
        removeProduct: async (parent, { productId }) => {
            return await Product.findOneAndDelete({ _id: productId })
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
            else{
                return await Cart.create({
                    userId: userId,
                    items: [{ stripeProductId: stripeProductId, price: price}],
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
        }
    }
}

module.exports = resolvers
