import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store';

import './style.css';

const root = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  root
);
