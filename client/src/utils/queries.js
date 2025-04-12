import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($productType: ID, $ids: [ID]) {
    products(productType: $productType, ids: $ids) {
      _id
      name
      productType
      listingURL
      image
    }
  }
`;

export const QUERY_PRUDUCT_TYPES = gql`
  query getProductTypes {
    productTypes {
      _id
      name
      image
      subcategory
      description
    }
  }
`

export const QUERY_PRUDUCT_TYPE = gql`
  query getProductType($productTypeId: ID!) {
    productType(productTypeId: $productTypeId) {
      _id
      name
      image
      subcategory
      description
    }
  }
`

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      productType
      listingURL
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