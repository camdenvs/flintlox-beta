import React, { useEffect, useState } from 'react'
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
import { Box } from '@chakra-ui/react';
import About from './pages/About';
import { ShoppingCartContext } from './context/ShoppingCartContext';
import Success from './pages/Success';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://flintlox-0fa2452f6bb5.herokuapp.com/graphql',
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
  if (window.localStorage.getItem('cart') === null) {
    window.localStorage.setItem('cart', JSON.stringify({ items: [], total: 0}))
  }

  const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('cart')))

  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem('cart')))
  }, [setCart])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart, setCart])

  return (
    <ApolloProvider client={client}>
      <ShoppingCartContext.Provider value={cart}>
        <Router>
          <Header cart={cart} setCart={setCart} />
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
                element={<Product cart={cart} setCart={setCart} />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/signup'
                element={<Signup />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route 
              path='/success'
              element={<Success setCart={setCart}/>}
              />
            </Routes>
            <Footer />
          </Box>
        </Router>
      </ShoppingCartContext.Provider>
    </ApolloProvider>
  );
}

export default App;
