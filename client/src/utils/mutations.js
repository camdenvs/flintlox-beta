import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TO_NEWSLETTER = gql`
  mutation addToNewsletter($email: String!) {
    addToNewsletter(email: $email) {
      _id
      email
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $price: Int!, $description: String!, $image: String!, $category: String!, $sizes: String) {
    createProduct(name: $name, price: $price, description: $description, image: $image, category: $category, sizes: $sizes) {
      _id
      name
      price
      description
      image
      category
      sizes
    }
  }
`

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
      name
      price
      description
      image
      category
    }
  }
`

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

export const ADD_TO_CART = gql`
  mutation addToCart($userId: ID!, $productId: ID!, $size: String!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, size: $size, quantity: $quantity) {
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
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($userId: ID!, $itemId: ID!) {
    removeFromCart(userId: $userId, itemId: $itemId) {
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
    }
  }
`

export const CLEAR_CART = gql`
  mutation clearCart($userId: ID!) {
    clearCart(userId: $userId) {
      _id
    }
  }
`