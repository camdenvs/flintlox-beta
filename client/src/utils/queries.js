import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    campaigns {
      _id
      title
      image
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
      createdAt
      link
    }
  }
`;

export const QUERY_SINGLE_CAMPAIGN = gql`
  query getSingleCampaign($campaignId: ID!) {
    campaign(campaignId: $campaignId) {
      _id
      title
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
      image
      updates {
        authorId
        title
        body
        createdAt
      }
      comments
      story
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: String) {
    products(category: $category) {
      _id
      name
      price
      description
      image
      category
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
      image
      category
      sizes
    }
  }
`;

export const QUERY_NEWS = gql`
  query getNews {
    allNews {
      _id
      title
      body
      createdAt
    }
  }
`;

export const QUERY_SINGLE_NEWS = gql`
  query getNews($newsId: ID!) {
    news(newsId: $newsId) {
      _id
      title
      body
      createdAt
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