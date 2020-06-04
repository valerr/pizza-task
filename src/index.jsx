import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import reducer from './reducers';
import { fetchData } from './actions';
import App from './components/App';

const init = (gon) => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.dispatch(fetchData(gon));
  // const socket = io();

  // socket.on('newOrder', ({ data }) => {
  //   store.dispatch(orderReceived(data));
  // });


  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('delivery'),
  );
};

export default init;
