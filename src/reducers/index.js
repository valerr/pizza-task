import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.fetchData]: (state, action) => {
    const { pizzas, orders } = action.payload;
    return {
      ...state,
      pizzas,
      orders,
      cart: [],
    };
  },
  [actions.addToCart]: (state, action) => {
    const id = action.payload;
    const itemInCart = state.cart.find(({ item }) => item.id === id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      const itemInMenu = state.pizzas.find((elem) => elem.id === id);
      const element = { item: itemInMenu, quantity: 1 };
      state.cart.push(element);
    }
  },
  [actions.orderReceived]: (state, { payload: { attributes } }) => {
    state.orders.push(attributes);
  },
});

export default reducer;
