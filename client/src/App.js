import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Category from './pages/Category'
import Product from './pages/Product'
import Store from './pages/Store';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Header from './components/Header'
// import Footer from './components/Footer'
// import Success from './pages/Success';
import { Box } from '@chakra-ui/react';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Box paddingTop={'130px'}>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path={'/store'}
              element={<Store />}
            />
            <Route
              path={'/store/:subcategory'}
              element={<Store />}
            />
            <Route
              path={'/category/:category'}
              element={<Category />}
            />
            <Route
              path='/products/:productId'
              element={<Product />}
            />
            <Route
            path='/signup'
            element={<Signup />}
            />
            <Route
            path='/login'
            element={<Login />}
            />
          </Routes>
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;
