import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import reducer from './reducers';
import { fetchData } from './actions';
import App from './components/App';
import Context from './Context';

const createUser = () => {
  const id = Math.random().toString(36).substr(2, 9);
  Cookies.set('userId', id);
};

const init = (gon) => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.dispatch(fetchData(gon));

  if (!Cookies.get('userId')) {
    createUser();
  }

  ReactDOM.render(
    <Provider store={store}>
      <Context.Provider value={Cookies.get('userId')}>
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('delivery'),
  );
};

export default init;
