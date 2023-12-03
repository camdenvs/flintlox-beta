import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($subcategory: String) {
    products(subcategory: $subcategory) {
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
        description
        images
        availableCount
      }
      subcategory
      releaseDate
      thumbnail
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
    }
  }
`;


export const QUERY_ORDERS = gql`
  query orders($userId: ID) {
    orders(userId: $userId) {
      _id
      userId
      items {
        _id
        name
        stripeProductId
        price
      }
      total
      date_added
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
        name
        stripeProductId
        price
      }
      total
    }
  }
`

export const CHECKOUT = gql`
  query checkout($cartId: ID!) {
    checkout(cartId: $cartId) {
      session
    }
  }
`