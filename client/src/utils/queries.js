import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($subcategory: String) {
    products(subcategory: $subcategory) {
      _id
      name
      price
      description
      images
      subcategory
      availableCount
      releaseDate
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      price
      description
      images
      subcategory
      availableCount
      releaseDate
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
        productId
        name
        size
        quantity
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
        productId
        name
        size
        quantity
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