import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAction('fetchData');

export const addToCart = createAction('addToCart');

export const orderReceived = createAction('orderReceived');

export const createOrder = (name, address, items) => async () => {
  const path = routes.ordersPath();
  const data = { attributes: { name, address, items } };
  await axios.post(path, { data });
};
