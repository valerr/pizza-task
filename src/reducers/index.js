import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.fetchData]: (state, action) => {
    const { pizzas } = action.payload;
    return {
      ...state,
      pizzas,
      userOrders: [],
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
  [actions.orderReceived]: (state) => {
    state.cart.length = 0; // eslint-disable-line no-param-reassign
  },
  [actions.historyReceived]: (state, { payload: { data } }) => {
    state.userOrders.push(...data);
  },
});

export default reducer;
