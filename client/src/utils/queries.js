import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($subcategory: String, $ids: [ID]) {
    products(subcategory: $subcategory, ids: $ids) {
      _id
      name
      price
      subcategory
      releaseDate
      thumbnail
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      price
      variants {
        _id
        name
        stripeProductId
        images
        availableCount
      }
      subcategory
      releaseDate
      thumbnail
      description
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      isAdmin
      orders
    }
  }
`;


export const QUERY_ORDERS = gql`
  query orders($userId: ID!) {
    orders(userId: $userId) {
      _id
      userId
      items {
        _id
        image
        name
        stripeProductId
      }
      date_added
      shipping_status
      invoice
    }
  }
`

export const QUERY_CART = gql`
  query cart($userId: ID!) {
    cart(userId: $userId) {
      _id
      userId
      items {
        _id
        image
        name
        stripeProductId
        price
      }
      total
    }
  }
`

export const CHECKOUT = gql`
  query checkout($items: [String!]!) {
    checkout(items: $items) {
      session
    }
  }
`