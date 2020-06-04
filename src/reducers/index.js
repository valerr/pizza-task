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
    const item = action.payload;
    state.cart.push(item);
  },
});

export default reducer;
