const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    
    type User {
        _id: ID
        username: String
        email: String
        password: String
        isAdmin: Boolean
        orders: [ID]
    }

    type Variant {
        _id: ID
        name: String
        images: [String]
        stripeProductId: String
        availableCount: Int
    }

    type Product {
        _id: ID
        name: String
        price: Int
        subcategory: [String]
        releaseDate: String
        variants: [Variant]
        thumbnail: String
        description: [String]
    }

    type Item {
        _id: ID
        image: String
        name: String
        stripeProductId: ID
        price: Int
    }

    type Cart {
        _id: ID
        userId: ID
        items: [Item]
        total: Int
    }

    type OrderItem {
        _id: ID
        name: String
        image: String
        stripeProductId: String
    }

    type Order {
        _id: ID
        userId: ID
        items: [OrderItem]
        date_added: String
        shipping_status: String
        invoice: String
    }

    type Checkout {
        session: ID
    }

    type Query {
        users: [User]
        me: User
        user(username: String!): User
        products(subcategory: String): [Product]
        product(productId: ID!): Product
        orders(userId: ID!): [Order]
        cart(userId: ID!): Cart
        checkout(items: [String!]!): Checkout
    }
    
    type Mutation {
        createProduct(name: String! price: Int!, description: String!, image: String!, subcategory: [String!]!, availableCount: Int!, releaseDate: String!): Product
        removeProduct(productId: ID!): Product
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addToCart(userId: ID!, name: String!, stripeProductId: String!, price: Int!, image: String!): Cart
        removeFromCart(userId: ID!, itemId: ID!): Cart
        clearCart(userId: ID!): Cart
        addOrder(userId: ID!, stripeProductIds: [String!]!, invoice: String!, names: [String!]!, images: [String!]!): User
        lowerAvailability(stripeProductIds: [String!]!): [Product]
    }
`

module.exports = typeDefs;