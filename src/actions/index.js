import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAction('fetchData');

export const addToCart = createAction('addToCart');

export const removeFromCart = createAction('removeFromCart');

export const orderReceived = createAction('orderReceived');

export const historyReceived = createAction('historyReceived');

export const setCurrentMenuSection = createAction('setCurrentMenuSection');

export const setCurrentCurrency = createAction('setCurrentCurrency');

export const createOrder = (name, address, items, userId, date) => async (dispatch) => {
  const path = routes.ordersPath();
  const data = {
    attributes:
    {
      name, address, items, userId, date,
    },
  };
  await axios.post(path, { data });
  dispatch(orderReceived({ data }));
};

export const getOrderHistory = ({ userId }) => async (dispatch) => {
  const path = routes.orderPath(userId);
  const { data } = await axios.get(path);
  dispatch(historyReceived(data));
};
