import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient, gql} from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import {resolvers, typeDefs} from './graphql/resolvers';


const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com' //endpoint from playground to graphql server
})
const cache = new InMemoryCache(); //a class holding chached data to avoid double requests, also to replace redux as a single source of truth state managment
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs, //now client has access to the new mutations
  resolvers
});

//every time we click on mutation we trigger updating the below value, which rerenders all containers that listen for that value in a similar way as redux state updates all components listening for that selector
client.writeData({
  data: {
    cartHidden: true, //starting on replacing methods to control dropdown cart functionality
    cartItems: [], //initial state of cart (like inside redux reducer)
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
